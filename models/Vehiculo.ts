class Vehiculo {
    id: number | undefined;
    nombre: string | undefined;
    descripcion: string | undefined;
    // I29
    dietasAnualesDelConductor = 0;
    // DE3 I10 J10
    tipoInteres = 0;
    // DE80
    costoNeumaticosPorKm = 0;
    // DE61
    costeDeMantenimientoPorKmSinIva = 0;
    parametro: Parametro = new Parametro();

    // Gasto total anual en neumáticos (u$s)
    // DE80*I11
    get costeTotalAnualEnNeumaticos() {
        return (
            this.costoNeumaticosPorKm * this.parametro.kmRecorridosAnualmente
        );
    }

    // Gasto anual en mantenimiento sin IVA (u$s)
    // I11*DE61
    get costeAnualEnMantenimiento() {
        return (
            this.parametro.kmRecorridosAnualmente *
            this.costeDeMantenimientoPorKmSinIva
        );
    }

    // Amortización y gastos financieros
    // E11
    // (I15-I19)*(1/I17)+(I15-I19)*(-(1/I17)+I10/(1-POWER(1+I10;-I17)))+(I21-I25)*(1/I23)+(I21-I25)*(-(1/I23)+I10/(1-POWER(1+I10;-I23)))
    get amortizacionYGastosFinancieros() {
        let amortizacionYGastosFinancierosVehiculo =
            (this.parametro.valorAdquisicionVehiculoSinIvaSinNeumaticos -
                this.parametro.valorResidualSinIvaDelVehiculo) *
                (1 / this.parametro.vidaUtilDelVehiculo) +
            (this.parametro.valorAdquisicionVehiculoSinIvaSinNeumaticos -
                this.parametro.valorResidualSinIvaDelVehiculo) *
                (-(1 / this.parametro.vidaUtilDelVehiculo) +
                    this.tipoInteres /
                        (1 -
                            Math.pow(
                                1 + this.tipoInteres,
                                -this.parametro.vidaUtilDelVehiculo
                            )));
        let amortizacionYGastosFinancierosRemolque =
            (this.parametro
                .valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos -
                this.parametro.valorResidualDelRemolqueSemirremolqueSinIva) *
                (1 / this.parametro.vidaUtilDelRemolqueSemirremolque) +
            (this.parametro
                .valorAdquisicionRemolqueSemirremolqueSinIvaSinNeumaticos -
                this.parametro.valorResidualDelRemolqueSemirremolqueSinIva) *
                (-(1 / this.parametro.vidaUtilDelRemolqueSemirremolque) +
                    this.tipoInteres /
                        (1 -
                            Math.pow(
                                1 + this.tipoInteres,
                                -this.parametro.vidaUtilDelRemolqueSemirremolque
                            )));

        if (!isFinite(amortizacionYGastosFinancierosVehiculo))
            amortizacionYGastosFinancierosVehiculo = 0;
        if (!isFinite(amortizacionYGastosFinancierosRemolque))
            amortizacionYGastosFinancierosRemolque = 0;

        return (
            amortizacionYGastosFinancierosVehiculo +
            amortizacionYGastosFinancierosRemolque
        );
    }

    // Personal
    // E12
    // =I27+I29
    get personal() {
        return (
            this.parametro
                .costeTotalAnualDelConductorIncluidosCostesDeEmpresaSegSocYOtros +
            this.dietasAnualesDelConductor
        );
    }

    // Combustible, neumáticos, reparaciones, mantenimiento
    // E14
    // I39+I41+I43
    get combustibleNeumaticosReparacionesMantenimiento() {
        return (
            this.parametro.costeTotalAnualEnCarburante +
            this.costeTotalAnualEnNeumaticos +
            this.costeAnualEnMantenimiento
        );
    }

    // COSTES TOTALES
    // SUM(E11:E14)
    get costesTotales() {
        return (
            this.amortizacionYGastosFinancieros +
            this.personal +
            this.parametro.segurosCostesFiscalesGestionYComercializacion +
            this.combustibleNeumaticosReparacionesMantenimiento
        );
    }

    // Costes por tiempo
    // E11+E12+E13
    get costesPorTiempo() {
        return (
            this.amortizacionYGastosFinancieros +
            this.personal +
            this.parametro.segurosCostesFiscalesGestionYComercializacion
        );
    }

    // Coste total medio (por km. facturado)
    // E43/I11
    get costeTotalMedioPorKmFacturado() {
        let costeTotalMedioPorKmFacturado =
            this.costesTotales / this.parametro.kmRecorridosAnualmente;

        if (!isFinite(costeTotalMedioPorKmFacturado))
            costeTotalMedioPorKmFacturado = 0;

        return costeTotalMedioPorKmFacturado;
    }

    // Coste total medio (por hora facturada)
    // E43/I13
    get costeTotalMedioPorHoraFacturada() {
        let costeTotalMedioPorHoraFacturada =
            this.costesTotales / this.parametro.horasTrabajadasAlAno;

        if (!isFinite(costeTotalMedioPorHoraFacturada))
            costeTotalMedioPorHoraFacturada = 0;

        return costeTotalMedioPorHoraFacturada;
    }

    // Coste por distancia media (por km.)
    // E63/I13
    get costePorDistanciaMediaPorKm() {
        let costePorDistanciaMediaPorKm =
            this.costesPorTiempo / this.parametro.horasTrabajadasAlAno;

        if (!isFinite(costePorDistanciaMediaPorKm))
            costePorDistanciaMediaPorKm = 0;

        return costePorDistanciaMediaPorKm;
    }

    // Coste por tiempo medio (por hora)
    // E65/I19
    get costePorTiempoMedioPorHora() {
        let costePorTiempoMedioPorHora =
            this.costesPorTiempo / this.parametro.vidaUtilDelVehiculo;

        if (!isFinite(costePorTiempoMedioPorHora))
            costePorTiempoMedioPorHora = 0;

        return costePorTiempoMedioPorHora;
    }

    // Costes totales por viajero-kilómetro
    // E43/I11/I15
    get costesTotalesPorViajeroKilometro() {
        let costesTotalesPorViajeroKilometro =
            this.costesTotales /
            this.parametro.kmRecorridosAnualmente /
            this.parametro.valorAdquisicionVehiculoSinIvaSinNeumaticos;

        if (!isFinite(costesTotalesPorViajeroKilometro))
            costesTotalesPorViajeroKilometro = 0;

        return costesTotalesPorViajeroKilometro;
    }
}

