const factory = require('./handlerFactory');
const prisma = require('../prismaClient');

exports.setClinicId = (req, res, next) => {
  if (!req.body.clinicId) {
    req.body.clinicId = req.user.id;
  }
  next();
};
exports.getAllReferrals = factory.getAll(prisma.referral, {
  include: {
    patient: true,
    clinic: true,
  },
});
exports.createReferral = factory.createOne(prisma.referral, 'Referral');
exports.getReferral = factory.getOne(prisma.referral, {
  include: {
    patient: true,
    clinic: true,
  },
});
exports.deleteReferral = factory.deleteOne(prisma.referral);
exports.updateReferral = factory.updateOne(prisma.referral);
