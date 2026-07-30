const factory = require('./handlerFactory');
const prisma = require('../prismaClient');

exports.setClinicId = (req, res, next) => {
  if (!req.body.clinicId) {
    req.body.clinicId = req.user.id;
  }
  next();
};

// ROUTE HANDLERS
exports.getAllPatients = factory.getAll(prisma.patient, {
  include: {
    clinic: true,
  },
});
exports.getPatient = factory.getOne(prisma.patient, {
  include: {
    clinic: true,
  },
});
exports.createPatient = factory.createOne(prisma.patient, 'Patient');
exports.updatePatient = factory.updateOne(prisma.patient);
exports.deletePatient = factory.deleteOne(prisma.patient);
