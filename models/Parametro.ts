class Parametro {
    // I11
    kmRecorridosAnualmente = 0;
    // I13
    horasTrabajadasAlAno = 0;
    // I15
    valorAdquisicionVehiculoSinIvaSinNeumaticos = 0;
    // I17
    vidaUtilDelVehiculo = 0;
    // I19
    valorResidualSinIvaDelVehiculo = 0;
    // I21
    valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos = 0;
    // I23
    vidaUtilDelRemolqueSemirremolque = 0;
    // I25
    valorResidualDelRemolqueSemirremolqueSinIva = 0;
    // I27
    costeTotalAnualDelConductorIncluidosCostesDeEmpresaSegSocYOtros = 0;
    // I31
    costeTotalAnualDeLosSeguros = 0;
    // I33
    costeFiscalTotalAnual = 0;
    // I35
    precioCarburanteSinIva = 0;
    // I37
    consumoMedio = 0;
    // I45
    totalCostesAnualesIndirectosRepercutiblesAEsteVehiculo = 0;

    // Gasto total anual en carburante, sin IVA (u$s)
    // I11/100*I37*I35
    get costeTotalAnualEnCarburante() {
        return (
            (this.kmRecorridosAnualmente / 100) *
            this.consumoMedio *
            this.precioCarburanteSinIva
        );
    }

    // Seguros, costes fiscales, gestión y comercialización
    // E13
    // I31+I33+I35+I45
    get segurosCostesFiscalesGestionYComercializacion() {
        return (
            this.costeTotalAnualDeLosSeguros +
            this.costeFiscalTotalAnual +
            this.precioCarburanteSinIva +
            this.totalCostesAnualesIndirectosRepercutiblesAEsteVehiculo
        );
    }

}
