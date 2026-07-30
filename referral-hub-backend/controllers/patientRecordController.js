const factory = require('./handlerFactory');
const prisma = require('../prismaClient');

exports.setNurseId = (req, res, next) => {
  if (!req.body.nurseId) {
    req.body.nurseId = req.user.id;
  }
  next();
};

exports.getAllPatientRecords = factory.getAll(prisma.patientRecord, {
  include: {
    nurse: true,
    doctor: true,
    referral: {
      include: {
        patient: true, // ✅ THIS is what you need
        clinic: true, // (optional but recommended)
      },
    },
  },
});
exports.createPatientRecord = factory.createOne(
  prisma.patientRecord,
  'PatientRecord',
);
exports.getPatientRecord = factory.getOne(prisma.patientRecord, {
  include: {
    nurse: true,
    doctor: true,
    referral: {
      include: {
        patient: true,
        clinic: true,
      },
    },
  },
});
exports.updatePatientRecord = factory.updateOne(prisma.patientRecord);
exports.deletePatientRecord = factory.deleteOne(prisma.patientRecord);
