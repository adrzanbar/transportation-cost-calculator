export default function Page({ params }: { params: { id: string } }) {
    return <div>My Servicio: {params.id}</div>;
}
