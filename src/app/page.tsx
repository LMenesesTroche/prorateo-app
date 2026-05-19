"use client";

import { Zap, BarChart3, LineChart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const WaterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C12 2 5 10 5 14a7 7 0 0 0 14 0c0-4-7-12-7-12z" />
  </svg>
);

export const BarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="3" y="10" width="4" height="10" rx="2" />
    <rect x="10" y="6" width="4" height="14" rx="2" />
    <rect x="17" y="2" width="4" height="18" rx="2" />
  </svg>
);

export default function Landing() {
  const router = useRouter();

  return (
    <div
      className="relative min-h-screen flex flex-col items-center pt-24 pb-10 px-6 overflow-hidden
      bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200
      before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_40%)]
      after:absolute after:inset-0 after:pointer-events-none after:bg-[radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.06),transparent_40%)]"
    >
      {/* noise */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />

      {/* HEADER */}
      <div className="text-center mb-10">
        <p className="text-sm bg-blue-100 text-blue-600 px-4 py-1 rounded-full inline-block mb-3">
          Bienvenido
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          Panel de Servicios
        </h1>

        <p className="text-slate-500 mt-3">
          Gestiona y consulta tus medidores de agua y luz
        </p>
      </div>

      {/* CARDS */}
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AGUA */}
          <div
            onClick={() => {
              console.log("CLICK OK");
              router.push("/agua");
            }}
            className="group flex items-center justify-between p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-200">
                <WaterIcon className="w-7 h-7 text-blue-600" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800">Agua</h2>
                <p className="text-sm text-slate-500">Registrar consumo</p>
              </div>
            </div>

            <ArrowRight className="text-blue-600 group-hover:translate-x-1 transition" />
          </div>

          {/* LUZ */}
          <div
            onClick={() => router.push("/luz")}
            className="group flex items-center justify-between p-6 rounded-2xl bg-yellow-50 hover:bg-yellow-100 transition shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-200">
                <Zap className="w-6 h-6 text-yellow-700" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800">Luz</h2>
                <p className="text-sm text-slate-500">Registrar consumo</p>
              </div>
            </div>

            <ArrowRight className="text-yellow-600 group-hover:translate-x-1 transition" />
          </div>

          {/* HISTORIAL AGUA */}
          <div
            onClick={() => router.push("/historial-agua")}
            className="group flex items-center justify-between p-6 rounded-2xl bg-cyan-50 hover:bg-cyan-100 transition shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-4">
              {/* <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-200"> */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-200">
                <BarIcon className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Historial Agua
                </h2>
                <p className="text-sm text-slate-500">Ver registros</p>
                {/* </div> */}
              </div>{" "}
            </div>

            <ArrowRight className="text-cyan-600 group-hover:translate-x-1 transition" />
          </div>

          {/* HISTORIAL LUZ */}
          <div
            onClick={() => router.push("/historial-luz")}
            className="group flex items-center justify-between p-6 rounded-2xl bg-orange-50 hover:bg-orange-100 transition shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-200">
                <LineChart className="w-6 h-6 text-orange-700" />
              </div>

              {/* <div> */}
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Historial Luz
                </h2>
                <p className="text-sm text-slate-500">Ver registros</p>
                {/* </div> */}
              </div>
            </div>

            <ArrowRight className="text-orange-600 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <p className="text-sm text-slate-400 mt-10">
        Hecho con cariño • Controla tus gastos
      </p>
    </div>
  );
}
