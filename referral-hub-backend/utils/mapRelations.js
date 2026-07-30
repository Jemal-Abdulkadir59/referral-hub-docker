const mapRelations = (modelName, body) => {
  const data = { ...body };

  if (modelName === 'Referral') {
    data.clinic = { connect: { id: body.clinicId } };
    data.patient = { connect: { id: body.patient } };

    delete data.clinicId;
    delete data.patientId;
  }

  if (modelName === 'Patient') {
    data.clinic = { connect: { id: body.clinicId } };
    delete data.clinicId;
  }

  if (modelName === 'PatientRecord') {
    data.nurse = { connect: { id: body.nurseId } };
    data.doctor = { connect: { id: body.doctor } };
    data.referral = { connect: { id: body.referral } };

    delete data.nurseId;
    delete data.doctorId;
    delete data.referralId;
  }

  if (modelName === 'DoctorReport') {
    console.log('BODY:', JSON.stringify(body, null, 2));
    data.doctor = { connect: { id: body.doctorId } };
    data.patientRecord = { connect: { id: body.patientRecord } };

    delete data.doctorId;
    delete data.patientRecordId;
  }

  return data;
};

module.exports = mapRelations;
