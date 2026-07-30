const factory = require('./handlerFactory');
const prisma = require('../prismaClient');

exports.setDoctorId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.doctorId) {
    req.body.doctorId = req.user.id;
  }
  next();
};

exports.getAllDoctorReport = factory.getAll(prisma.doctorReport, {
  include: {
    doctor: true,
    patientRecord: {
      include: {
        referral: {
          include: {
            patient: true,
            clinic: true,
          },
        },
      },
    },
  },
});
exports.createDoctorReport = factory.createOne(
  prisma.doctorReport,
  'DoctorReport',
);
exports.getDoctorReport = factory.getOne(prisma.doctorReport, {
  include: {
    doctor: true,
    patientRecord: {
      include: {
        referral: {
          include: {
            patient: true,
            clinic: true,
          },
        },
      },
    },
  },
});
exports.updateDoctorReport = factory.updateOne(prisma.doctorReport);
exports.deleteDoctorReport = factory.deleteOne(prisma.doctorReport);
