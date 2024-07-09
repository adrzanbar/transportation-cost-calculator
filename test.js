const parameters = {
  vehicleAcquisitionValue: 119400,
  vehicleUsefulLife: 10,
  vehicleResidualValue: 14000,
  trailerAcquisitionValue: 13800,
  trailerUsefulLife: 10,
  trailerResidualValue: 3000,
};

const {
  vehicleAcquisitionValue,
  vehicleUsefulLife,
  vehicleResidualValue,
  trailerAcquisitionValue,
  trailerUsefulLife,
  trailerResidualValue,
} = parameters;

console.log(parameters);

console.log(
  (vehicleAcquisitionValue - vehicleResidualValue) / vehicleUsefulLife
);

console.log(
    (vehicleAcquisitionValue - vehicleResidualValue) / -vehicleUsefulLife
  );
