import Calculator from "@/components/calculator";
import db from "@/db";

export default async function Home() {
  const vehicles = await db.vehicle.findMany();
  return (
    <main>
      <Calculator vehicles={vehicles} />
    </main>
  );
}
