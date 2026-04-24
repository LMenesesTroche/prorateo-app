import Link from "next/link";
import HistorialTable from "@/components/HistorialTable";

export default function Page() {
  return (
    <div className="space-y-4">
      <HistorialTable
        collectionName="luzMedidoresHistorial"
        title="Historial Luz"
      />

      <Link href="/luz" className="link">
        Volver
      </Link>
    </div>
  );
}
