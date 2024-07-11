import Calculator from "@/components/calculator";
import db from "@/db";

export default async function Home() {
  const vehiculosPrisma = await db.vehiculo.findMany({
    include: {
      parametro: true,
    },
  });
  if (!vehiculosPrisma) {
    return <h1>Something went wrong</h1>;
  }
  const vehiculos = vehiculosPrisma.map(({ parametroId, ...vehiculoRest }) => {
    const { id, ...parametroRest } = vehiculoRest.parametro;
    return {
      ...vehiculoRest,
      parametro: parametroRest,
    };
  });
  return (
    <main>
      <Calculator vehiculos={vehiculos} />
    </main>
  );
}
