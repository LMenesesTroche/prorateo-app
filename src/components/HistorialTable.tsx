"use client";

// Reusable historial table with chart
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

type HistorialItem = {
  id: string;
  fecha: { seconds: number };
  medidorMenesesAntes: number;
  medidorMenesesAhora: number;
  medidorTodosAntes: number;
  medidorTodosAhora: number;
  factura: number;
  cuantoMeneses: number;
  cuantoArrayas: number;
};

export default function HistorialTable({
  collectionName,
  title,
}: {
  collectionName: string;
  title: string;
}) {
  const [data, setData] = useState<HistorialItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const ref = collection(db, collectionName);
      const snap = await getDocs(ref);

      const parsed = snap.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a: any, b: any) => b.fecha.seconds - a.fecha.seconds);

      setData(parsed as HistorialItem[]);
    };

    fetchData();
  }, [collectionName]);

  const borrarTodo = async () => {
    const ref = collection(db, collectionName);
    const snap = await getDocs(ref);

    await Promise.all(snap.docs.map((doc) => deleteDoc(doc.ref)));

    setData([]);
  };

  return (
    <div className="card">
      <h1 className="title">{title}</h1>

      {data.length === 0 ? (
        <p>No hay datos.</p>
      ) : (
        <>
          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Meneses Antes</th>
                  <th>Meneses Ahora</th>
                  <th>Todos Antes</th>
                  <th>Todos Ahora</th>
                  <th>Factura</th>
                  <th>Meneses</th>
                  <th>Arrayas</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {new Date(item.fecha.seconds * 1000).toLocaleDateString()}
                    </td>
                    <td>{item.medidorMenesesAntes}</td>
                    <td>{item.medidorMenesesAhora}</td>
                    <td>{item.medidorTodosAntes}</td>
                    <td>{item.medidorTodosAhora}</td>
                    <td>{item.factura}</td>
                    <td>{item.cuantoMeneses} Bs</td>
                    <td>{item.cuantoArrayas} Bs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CHART */}
          <div className="h-[400px] mt-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[...data].reverse().map((item) => ({
                  fecha: new Date(
                    item.fecha.seconds * 1000,
                  ).toLocaleDateString(),
                  factura: item.factura,
                  meneses: item.cuantoMeneses,
                  arrayas: item.cuantoArrayas,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="factura" stroke="#6366f1" />
                <Line type="monotone" dataKey="meneses" stroke="#22c55e" />
                <Line type="monotone" dataKey="arrayas" stroke="#f97316" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Borrar todo */}
          <button onClick={borrarTodo} className="btn-danger mt-6">
            Borrar historial
          </button>
        </>
      )}
    </div>
  );
}
