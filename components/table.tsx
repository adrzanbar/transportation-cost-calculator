import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const costs = [
  {
    name: "Coste total medio (por km. facturado)",
    user: 0,
    stats: 0,
  },
  {
    name: "Coste total medio (por hora facturada)",
    user: 0,
    stats: 0,
  },
  {
    name: "Coste por distancia",
    user: 0,
    stats: 0,
  },
  {
    name: "Coste por distancia media (por km.)",
    user: 0,
    stats: 0,
  },
  {
    name: "Coste por tiempo",
    user: 0,
    stats: 0,
  },
  {
    name: "Coste por tiempo medio (por hora)",
    user: 0,
    stats: 0,
  },
  {
    name: "Costes totales por viajero-kilómetro",
    user: 0,
    stats: 0,
  },
];

export function CostTable({
  user,
  stats,
}: {
  user: number[];
  stats: number[];
}) {
  user.forEach((value, index) => {
    costs[index].user = value;
  });
  stats.forEach((value, index) => {
    costs[index].stats = value;
  });
  return (
    <Table>
      <TableCaption>Costes Medios</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Costo</TableHead>
          <TableHead>Usuario</TableHead>
          <TableHead>Datos estadísticos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {costs.map((cost) => (
          <TableRow key={cost.name}>
            <TableCell className="font-medium">{cost.name}</TableCell>
            <TableCell>{cost.user}</TableCell>
            <TableCell>{cost.stats}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
