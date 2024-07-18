import CalculatorForm from "@/components/calculator-form";
import prisma from "@/lib/prisma";

export default async function Home() {
    const vehiculos = await prisma.vehiculo.findMany({
        include: {
            parametros: true,
        },
    });
    const exchangeRateUrl = process.env.EXCHANGE_RATE_URL;
    let dolar = 0;
    if (typeof exchangeRateUrl === "string") {
        try {
            const response = await fetch(exchangeRateUrl, {
                next: { revalidate: 3600 },
            });
            if (!response.ok) {
                throw new Error(
                    `Error fetching exchange rate: ${response.statusText}`
                );
            }
            const data = await response.json();
            dolar = data.conversion_rate;
        } catch (error) {
            console.error("Failed to fetch exchange rate:", error);
        }
    } else {
        console.error("exchangeRateUrl is undefined");
    }
    return <CalculatorForm vehiculos={vehiculos} dolar={dolar} />;
}
