import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";

// const rows = [
//     {
//         name: "Coste total medio (por km. facturado)",
//         data: 0.85,
//     },
//     {
//         name: "Coste total medio (por hora facturada)",
//         data: 53.26,
//     },
//     {
//         name: "Coste por distancia",
//         data: 106348,
//     },
//     {
//         name: "Coste por distancia media (por km.)",
//         data: 37.98,
//     },
//     {
//         name: "Coste por tiempo",
//         data: 42773.33,
//     },
//     {
//         name: "Coste por tiempo medio (por hora)",
//         data: 3.06,
//     },
//     {
//         name: "Costes totales por viajero-kilómetro",
//         data: 0.0,
//     },
// ];

export function CostTable({
    rows,
}: {
    rows: { name: string; data: number }[];
}) {
    return (
        <Table>
            <TableCaption>Costes medios</TableCaption>
            <TableBody>
                {rows.map((invoice) => (
                    <TableRow key={invoice.name}>
                        <TableCell className="font-medium">
                            {invoice.name}
                        </TableCell>
                        <TableCell className="text-right">
                            {invoice.data.toLocaleString("es-AR")}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
