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

type Especialidad = {
  nombre: string;
  profesionales: number;
  citasMes: number;
};

const MOCK: Especialidad[] = [
  { nombre: "Cardiología", profesionales: 4, citasMes: 312 },
  { nombre: "Pediatría", profesionales: 6, citasMes: 248 },
  { nombre: "Dermatología", profesionales: 3, citasMes: 187 },
  { nombre: "Neurología", profesionales: 2, citasMes: 96 },
  { nombre: "Ginecología", profesionales: 3, citasMes: 154 },
];

export default function Page() {
  const router = useRouter();
  const [rows] = useState<Especialidad[]>(MOCK);

  const columns = [
    {
      key: "nombre",
      header: "Especialidad",
      render: (r: Especialidad) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.nombre} />
          <span className="font-medium text-slate-900">{r.nombre}</span>
        </div>
      ),
    },
    { key: "profesionales", header: "Profesionales", render: (r: Especialidad) => <span className="text-slate-600">{r.profesionales}</span> },
    { key: "citasMes", header: "Citas / mes", render: (r: Especialidad) => <span className="text-slate-600">{r.citasMes}</span> },
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
        title="Especialidades"
        subtitle="Áreas médicas disponibles y su volumen de consulta."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/especialidad/create")}>
            <Plus size={16} /> Nueva especialidad
          </Button>
        }
      />
      <Card className="!p-0">
        <DataTable columns={columns} rows={rows} empty="Aún no hay especialidades registradas." />
      </Card>
    </div>
  );
}
