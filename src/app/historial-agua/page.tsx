import Link from "next/link";
import HistorialTable from "@/components/HistorialTable";

export default function Page() {
  return (
    <div className="space-y-4">
      <HistorialTable
        collectionName="aguaMedidoresHistorial"
        title="Historial Agua"
      />

      <Link href="/agua" className="link">
        Volver
      </Link>
    </div>
  );
}
