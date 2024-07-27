import CalculatorForm from "@/components/calculator-form";
import prisma from "@/prisma/prisma";

export default async function Home() {
    const vehiculos = await prisma.vehiculo.findMany({
        include: {
            parametros: true,
        },
    });
    const response = await fetch(process.env.EXCHANGE_RATE_URL!, {
        next: { revalidate: 3600 },
    });
    const data = await response.json();
    const dolar = data.conversion_rate || 0;
    return <CalculatorForm vehiculos={vehiculos} dolar={dolar} />;
}
