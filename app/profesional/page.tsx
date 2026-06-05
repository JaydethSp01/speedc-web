"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type Profesional = {
  nombre: string;
  especialidad: string;
  pacientes: number;
};

const MOCK: Profesional[] = [
  { nombre: "Dra. Rodríguez", especialidad: "Cardiología", pacientes: 142 },
  { nombre: "Dr. Fernández", especialidad: "Dermatología", pacientes: 98 },
  { nombre: "Dra. López", especialidad: "Neurología", pacientes: 76 },
  { nombre: "Dr. Gómez", especialidad: "Pediatría", pacientes: 165 },
  { nombre: "Dra. Torres", especialidad: "Ginecología", pacientes: 121 },
];

export default function Page() {
  const router = useRouter();
  const [rows] = useState<Profesional[]>(MOCK);

  const columns = [
    {
      key: "nombre",
      header: "Profesional",
      render: (r: Profesional) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.nombre} />
          <span className="font-medium text-slate-900">{r.nombre}</span>
        </div>
      ),
    },
    { key: "especialidad", header: "Especialidad", render: (r: Profesional) => <Badge tone="brand">{r.especialidad}</Badge> },
    { key: "pacientes", header: "Pacientes", render: (r: Profesional) => <span className="text-slate-600">{r.pacientes}</span> },
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
        title="Profesionales"
        subtitle="Equipo médico, sus especialidades y carga de pacientes."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/profesional/create")}>
            <Plus size={16} /> Nuevo profesional
          </Button>
        }
      />
      <Card className="!p-0">
        <DataTable columns={columns} rows={rows} empty="Aún no hay profesionales registrados." />
      </Card>
    </div>
  );
}
