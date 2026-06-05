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

type Cita = {
  paciente: string;
  profesional: string;
  especialidad: string;
  fecha: string;
  estado: "Confirmada" | "Pendiente" | "Cancelada";
};

const MOCK: Cita[] = [
  { paciente: "Juan Pérez", profesional: "Dra. Rodríguez", especialidad: "Cardiología", fecha: "03 jun 2026 · 09:00", estado: "Confirmada" },
  { paciente: "Ana Gómez", profesional: "Dr. Fernández", especialidad: "Dermatología", fecha: "03 jun 2026 · 10:30", estado: "Pendiente" },
  { paciente: "Carlos Ruiz", profesional: "Dra. López", especialidad: "Neurología", fecha: "03 jun 2026 · 12:00", estado: "Cancelada" },
  { paciente: "Laura Martínez", profesional: "Dr. Gómez", especialidad: "Pediatría", fecha: "03 jun 2026 · 15:30", estado: "Confirmada" },
  { paciente: "Pedro Sánchez", profesional: "Dra. Torres", especialidad: "Ginecología", fecha: "04 jun 2026 · 08:15", estado: "Pendiente" },
];

const tone = (e: Cita["estado"]) => (e === "Confirmada" ? "success" : e === "Pendiente" ? "warning" : "danger");

export default function Page() {
  const router = useRouter();
  const [rows] = useState<Cita[]>(MOCK);

  const columns = [
    {
      key: "paciente",
      header: "Paciente",
      render: (r: Cita) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.paciente} />
          <span className="font-medium text-slate-900">{r.paciente}</span>
        </div>
      ),
    },
    { key: "profesional", header: "Profesional", render: (r: Cita) => <span className="text-slate-600">{r.profesional}</span> },
    { key: "especialidad", header: "Especialidad", render: (r: Cita) => <Badge tone="brand">{r.especialidad}</Badge> },
    { key: "fecha", header: "Fecha / hora", render: (r: Cita) => <span className="text-slate-600">{r.fecha}</span> },
    { key: "estado", header: "Estado", render: (r: Cita) => <Badge tone={tone(r.estado)}>{r.estado}</Badge> },
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
        title="Citas"
        subtitle="Agenda de consultas con su estado y profesional asignado."
        action={
          <Button className="cursor-pointer" onClick={() => router.push("/cita/create")}>
            <Plus size={16} /> Nueva cita
          </Button>
        }
      />
      <Card className="!p-0">
        <DataTable columns={columns} rows={rows} empty="Aún no hay citas agendadas." />
      </Card>
    </div>
  );
}
