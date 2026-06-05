"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

type Paciente = {
  nombre: string;
  edad: number;
  telefono: string;
  ultimaVisita: string;
};

const MOCK: Paciente[] = [
  { nombre: "Juan Pérez", edad: 42, telefono: "+57 300 124 5566", ultimaVisita: "12 may 2026" },
  { nombre: "Ana Gómez", edad: 35, telefono: "+57 311 998 2210", ultimaVisita: "28 abr 2026" },
  { nombre: "Carlos Ruiz", edad: 58, telefono: "+57 320 445 7788", ultimaVisita: "03 may 2026" },
  { nombre: "Laura Martínez", edad: 29, telefono: "+57 305 667 1199", ultimaVisita: "21 may 2026" },
  { nombre: "Pedro Sánchez", edad: 64, telefono: "+57 312 778 4433", ultimaVisita: "09 abr 2026" },
  { nombre: "Marta Díaz", edad: 47, telefono: "+57 318 223 6677", ultimaVisita: "16 may 2026" },
];

export default function Page() {
  const router = useRouter();
  const [rows] = useState<Paciente[]>(MOCK);

  const columns = [
    {
      key: "nombre",
      header: "Paciente",
      render: (r: Paciente) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.nombre} />
          <span className="font-medium text-slate-900">{r.nombre}</span>
        </div>
      ),
    },
    { key: "edad", header: "Edad", render: (r: Paciente) => <span className="text-slate-600">{r.edad} años</span> },
    { key: "telefono", header: "Teléfono", render: (r: Paciente) => <span className="text-slate-600">{r.telefono}</span> },
    { key: "ultimaVisita", header: "Última visita", render: (r: Paciente) => <span className="text-slate-600">{r.ultimaVisita}</span> },
    {
      key: "acciones",
      header: "Acciones",
      align: "right" as const,
      render: () => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" className="cursor-pointer !px-2.5"><Pencil size={15} /> Editar</Button>
          <Button variant="danger" className="cursor-pointer !px-2.5"><Trash2 size={15} /> Eliminar</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pacientes"
        subtitle="Historial y datos de contacto de las personas atendidas."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/paciente/create")}>
            <Plus size={16} /> Nuevo paciente
          </Button>
        }
      />
      <Card className="!p-0">
        <DataTable columns={columns} rows={rows} empty="Aún no hay pacientes registrados." />
      </Card>
    </div>
  );
}
