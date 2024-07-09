-- CreateTable
CREATE TABLE "Vehicle" (
    "name" TEXT NOT NULL,
    "parametersId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Parameters" (
    "id" SERIAL NOT NULL,
    "kilometersTraveledAnnualy" DOUBLE PRECISION NOT NULL,
    "hoursWorkedPerYear" DOUBLE PRECISION NOT NULL,
    "vehicleAcquisitionValue" DOUBLE PRECISION NOT NULL,
    "vehicleUsefulLife" DOUBLE PRECISION NOT NULL,
    "vehicleResidualValue" DOUBLE PRECISION NOT NULL,
    "trailerAcquisitionValue" DOUBLE PRECISION NOT NULL,
    "trailerUsefulLife" DOUBLE PRECISION NOT NULL,
    "trailerResidualValue" DOUBLE PRECISION NOT NULL,
    "otherCosts" DOUBLE PRECISION NOT NULL,
    "driversAnnualPerDiem" DOUBLE PRECISION NOT NULL,
    "annualInsuranceCosts" DOUBLE PRECISION NOT NULL,
    "annualFiscalCost" DOUBLE PRECISION NOT NULL,
    "fuelPrice" DOUBLE PRECISION NOT NULL,
    "averageConsumption" DOUBLE PRECISION NOT NULL,
    "indirectCosts" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Parameters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_parametersId_key" ON "Vehicle"("parametersId");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_parametersId_fkey" FOREIGN KEY ("parametersId") REFERENCES "Parameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
