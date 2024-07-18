class Servicio {
    vehiculo: Vehiculo = new Vehiculo();
    //     Denominación del servicio
    denominacion: string | undefined;
    // Kilómetros en carga (km)
    // H15
    kmEnCarga = 0;
    // Kilómetros en vacío (km)
    // H17
    kmEnVacio = 0;
    // Consumo medio por kilómetro en este servicio (litros / 100 km)
    // H19
    consumoMedioPorKm = 0;
    // Horas en carga
    // H23
    horasEnCarga = 0;
    // Horas en vacío
    // H25
    horasEnVacio = 0;
    // Horas en carga, descarga y paralización
    // H27
    horasEnCargaDescargaYParalizacion = 0;
    // Peajes
    // H29
    peajes = 0;
    // Otros costes asociados a este servicio (u$s)
    // H35
    otrosCostesAsociadosAEsteServicio = 0;
    // Cotización Dólar
    // H41
    cotizacionDolar = 0;
    fecha: Date = new Date();

    // Kilómetros recorridos en este servicio (km)
    // H15+H17
    get kmRecorridosEnEsteServicio() {
        return this.kmEnCarga + this.kmEnVacio;
    }

    // Horas empleadas en este servicio
    // H23+H25+H27
    get horasEmpleadasEnEsteServicio() {
        return (
            this.horasEnCarga +
            this.horasEnVacio +
            this.horasEnCargaDescargaYParalizacion
        );
    }

    // Coste por distancia de este servicio (u$s)
    // H13*(H19/100)*I35+H13*((I41+I43)/I11)+H29
    get costePorDistanciaDeEsteServicio() {
        return (
            this.kmRecorridosEnEsteServicio *
                (this.consumoMedioPorKm / 100) *
                this.vehiculo.costeTotalMedioPorKmFacturado +
            this.kmRecorridosEnEsteServicio *
                ((this.cotizacionDolar +
                    this.vehiculo.parametro.costeTotalAnualEnCarburante) /
                    this.vehiculo.parametro.kmRecorridosAnualmente) +
            this.peajes
        );
    }

    // Coste por tiempo de este servicio (u$s)
    // H21*((E11+E12+E13)/I13)
    get costePorTiempoDeEsteServicio() {
        return (
            this.horasEmpleadasEnEsteServicio *
            (this.vehiculo.costesPorTiempo /
                this.vehiculo.parametro.horasTrabajadasAlAno)
        );
    }

    // Coste total de este servicio (u$s)
    // H31+H33+H35
    get costeTotalDeEsteServicio() {
        return (
            this.costePorDistanciaDeEsteServicio +
            this.costePorTiempoDeEsteServicio +
            this.otrosCostesAsociadosAEsteServicio
        );
    }

    // Coste total de este servicio (ARS)
    // H37*H41
    get costeTotalDeEsteServicioARS() {
        return this.costeTotalDeEsteServicio * this.cotizacionDolar;
    }
}
