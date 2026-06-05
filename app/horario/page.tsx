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

type Horario = {
  profesional: string;
  dia: string;
  franja: string;
};

const MOCK: Horario[] = [
  { profesional: "Dra. Rodríguez", dia: "Lunes", franja: "08:00 - 13:00" },
  { profesional: "Dr. Fernández", dia: "Lunes", franja: "14:00 - 18:00" },
  { profesional: "Dra. López", dia: "Martes", franja: "09:00 - 12:00" },
  { profesional: "Dr. Gómez", dia: "Miércoles", franja: "08:00 - 15:00" },
  { profesional: "Dra. Torres", dia: "Jueves", franja: "10:00 - 17:00" },
  { profesional: "Dra. Rodríguez", dia: "Viernes", franja: "08:00 - 12:00" },
];

export default function Page() {
  const router = useRouter();
  const [rows] = useState<Horario[]>(MOCK);

  const columns = [
    {
      key: "profesional",
      header: "Profesional",
      render: (r: Horario) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.profesional} />
          <span className="font-medium text-slate-900">{r.profesional}</span>
        </div>
      ),
    },
    { key: "dia", header: "Día", render: (r: Horario) => <Badge tone="brand">{r.dia}</Badge> },
    { key: "franja", header: "Franja", render: (r: Horario) => <span className="text-slate-600">{r.franja}</span> },
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
        title="Horarios"
        subtitle="Disponibilidad semanal de cada profesional."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/horario/create")}>
            <Plus size={16} /> Nuevo horario
          </Button>
        }
      />
      <Card className="!p-0">
        <DataTable columns={columns} rows={rows} empty="Aún no hay horarios definidos." />
      </Card>
    </div>
  );
}
