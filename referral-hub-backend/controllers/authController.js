const crypto = require('crypto');
const { promisify } = require('util');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');

const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: 'lax', // 🔥 required for cross-origin
    secure: false, // 🔥 required for localhost
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // remove password from output
  user.password = null;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// SIGNUP
exports.signup = catchAsync(async (req, res, next) => {
  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const newUser = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      address: req.body.address,
      role: req.body.role ?? 'user',
      status: req.body.status ?? 'pending',
    },
  });

  createSendToken(newUser, 201, res);
});

// LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exist
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const correct = await bcrypt.compare(password, user.password);

  if (!correct) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date() + 10 * 1000,
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

// AUTHENTICATION
exports.protect = catchAsync(async (req, res, next) => {
  // 1)Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401), //appError ?
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exist
  const currentUser = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  // 4)Check if user changed password after the token was issued
  const JWTTimestamp = decoded.iat;

  if (currentUser.passwordChangedAt) {
    const changedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10,
    );
    // console.log(changedTimestamp, JWTTimestamp);

    if (JWTTimestamp < changedTimestamp) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401,
        ),
      );
    }
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
});

// ONLY FOR RENDERED PAGES, NO ERRORS!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 2) Verification token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      // 3) Check if user still exist
      const currentUser = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!currentUser) {
        return next();
      }

      // 4)Check if user changed password after the token was issued
      const JWTTimestamp = decoded.iat;

      if (currentUser.passwordChangedAt) {
        const changedTimestamp = parseInt(
          currentUser.passwordChangedAt.getTime() / 1000,
          10,
        );
        // console.log(changedTimestamp, JWTTimestamp);

        if (JWTTimestamp < changedTimestamp) return next();
      }

      // THERE IS A LOGGED IN USER
      // req.user = currentUser; //pass to next middleware
      res.locals.user = currentUser; //to access to template, just pass to template
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

//AUTHORIZATION: RESTRICTION AND PERMISSION
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles ['admin', 'user']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};

// FORGOT PASSWORD
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // 1. Get user based on POSTed email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2. Generate the random reset token
  const restToken = crypto.randomBytes(32).toString('hex');

  const hashedToken = crypto
    .createHash('sha256')
    .update(restToken)
    .digest('hex');

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetToken: hashedToken,
      passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  // 3. send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${restToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    // await user.save({ validateBeforeSave: false });
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  //   const user = await User.findOne({
  //     passwordResetToken: hashedToken,
  //     passwordResetExpires: { $gt: Date.now() },
  //   });
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: {
        gt: new Date(),
      },
    },
  });

  // 2. If the token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    },
  });

  // 3. Update changedPasswordAt Property for the user
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent } = req.body;
  // 1.Get user form collection
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  const { password, ...userSafe } = user;

  //2.Check if POSTed current password is correct
  const correct = await bcrypt.compare(passwordCurrent, password);

  if (!correct) {
    return next(new AppError('Your current password is wrong', 401));
  }

  const newPassword = await bcrypt.hash(req.body.password, 12);

  //3.If so update password
  //   user.password = newPassword;

  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      password: newPassword,
      passwordChangedAt: new Date(),
    },
  });

  // user.findByIdAndUpdate  WILL NOT WORK AS INTENDED!

  //4.log user in, send JWT
  createSendToken(updatedUser, 200, res);
});
