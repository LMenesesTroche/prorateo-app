"use client";

// Agua page with Firebase logic
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AguaPage() {
  const [medidorMenesesAntes, setMedidorMenesesAntes] = useState<string>("");
  const [medidorMenesesAhora, setMedidorMenesesAhora] = useState<string>("");
  const [medidorTodosAntes, setMedidorTodosAntes] = useState<string>("");
  const [medidorTodosAhora, setMedidorTodosAhora] = useState<string>("");
  const [cuantoMeneses, setCuantoMeneses] = useState<number | null>(null);
  const [cuantoArrayas, setCuantoArrayas] = useState<number | null>(null);
  const [factura, setFactura] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "aguaMedidores", "usuario1");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setMedidorMenesesAntes(data.medidorMenesesAhora || "");
        setMedidorTodosAntes(data.medidorTodosAhora || "");
      }
    };

    fetchData();
  }, []);

  const calcular = () => {
    const diffMeneses =
      parseFloat(medidorMenesesAhora) - parseFloat(medidorMenesesAntes);

    const diffTodos =
      parseFloat(medidorTodosAhora) - parseFloat(medidorTodosAntes);

    const total = parseFloat(factura);

    const meneses = (diffMeneses * total) / diffTodos;
    const arrayas = total - meneses;

    setCuantoMeneses(parseFloat(meneses.toFixed(2)));
    setCuantoArrayas(parseFloat(arrayas.toFixed(2)));
  };

  const guardar = async () => {
    const ref = doc(db, "aguaMedidores", "usuario1");

    const data = {
      medidorMenesesAntes: Number(medidorMenesesAntes),
      medidorTodosAntes: Number(medidorTodosAntes),
      medidorMenesesAhora: Number(medidorMenesesAhora),
      medidorTodosAhora: Number(medidorTodosAhora),
      factura: Number(factura),
      cuantoMeneses,
      cuantoArrayas,
    };

    await setDoc(ref, data);

    await addDoc(collection(db, "aguaMedidoresHistorial"), {
      ...data,
      fecha: Timestamp.now(),
    });

    setSuccess("Guardado correctamente");
  };

  return (
    <div className="card">
      <h1 className="title">💧 Agua</h1>

      <div className="grid gap-4">
        <Input
          label="Meneses antes"
          value={medidorMenesesAntes}
          onChange={setMedidorMenesesAntes}
        />
        <Input
          label="Todos antes"
          value={medidorTodosAntes}
          onChange={setMedidorTodosAntes}
        />
        <Input
          label="Meneses ahora"
          value={medidorMenesesAhora}
          onChange={setMedidorMenesesAhora}
        />
        <Input
          label="Todos ahora"
          value={medidorTodosAhora}
          onChange={setMedidorTodosAhora}
        />
        <Input label="Factura Bs" value={factura} onChange={setFactura} />
      </div>

      <button className="btn-primary mt-4" onClick={calcular}>
        Calcular
      </button>

      {cuantoMeneses && <p className="result">Meneses: {cuantoMeneses} Bs</p>}
      {cuantoArrayas && <p className="result">Arrayas: {cuantoArrayas} Bs</p>}

      {cuantoMeneses && cuantoArrayas && (
        <button className="btn-success mt-4" onClick={guardar}>
          Guardar
        </button>
      )}

      {success && <p className="text-green-600 mt-2">{success}</p>}

      <div className="flex gap-4 mt-6">
        <Link href="/historial-agua" className="link">
          Historial
        </Link>
        <Link href="/" className="link">
          Volver
        </Link>
      </div>
    </div>
  );
}

// Reusable input component
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
