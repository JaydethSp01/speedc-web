"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { CalendarCheck, Users, Stethoscope, Activity, Plus } from "lucide-react";
import { Hero } from "@/components/ui/Hero";
import { StatCard } from "@/components/ui/StatCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

const MOCK = {
  stats: [
    { label: "Citas hoy", value: 24, icon: <CalendarCheck size={20} />, trend: { value: "12%", positive: true } },
    { label: "Pacientes", value: 1280, icon: <Users size={20} />, trend: { value: "8%", positive: true } },
    { label: "Profesionales", value: 18, icon: <Stethoscope size={20} /> },
    { label: "Ocupación", value: "86%", icon: <Activity size={20} />, trend: { value: "3%", positive: false } },
  ],
  semana: [
    { label: "Lun", value: 18 }, { label: "Mar", value: 24 }, { label: "Mié", value: 21 },
    { label: "Jue", value: 30 }, { label: "Vie", value: 27 }, { label: "Sáb", value: 12 }, { label: "Dom", value: 6 },
  ],
  citas: [
    { paciente: "Juan Pérez", profesional: "Dra. Rodríguez", especialidad: "Cardiología", hora: "09:00", estado: "Confirmada" },
    { paciente: "Ana Gómez", profesional: "Dr. Fernández", especialidad: "Dermatología", hora: "10:30", estado: "Pendiente" },
    { paciente: "Carlos Ruiz", profesional: "Dra. López", especialidad: "Neurología", hora: "12:00", estado: "Cancelada" },
    { paciente: "Laura Martínez", profesional: "Dr. Gómez", especialidad: "Pediatría", hora: "15:30", estado: "Confirmada" },
  ],
};

const tone = (e: string) => (e === "Confirmada" ? "success" : e === "Pendiente" ? "warning" : "danger");

export default function Page() {
  const [data] = useState(MOCK);
  return (
    <div className="space-y-6">
      <Hero
        title="Buenos días, equipo Vida"
        subtitle="Tienes 24 citas hoy. La ocupación está al 86% — un día movido en consulta."
        action={<Button variant="secondary" className="!bg-white !text-brand"><Plus size={16} /> Nueva cita</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(data.stats ?? []).map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} trend={s.trend} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard className="lg:col-span-2" title="Citas por día" subtitle="Esta semana" data={data.semana} />
        <Card>
          <h3 className="mb-4 text-base font-semibold text-slate-900">Por especialidad</h3>
          <div className="space-y-3">
            {[
              { n: "Cardiología", p: 38 }, { n: "Pediatría", p: 27 },
              { n: "Dermatología", p: 21 }, { n: "Neurología", p: 14 },
            ].map((e) => (
              <div key={e.n}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{e.n}</span>
                  <span className="text-slate-500">{e.p}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${e.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="!p-0">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-900">Próximas citas</h3>
          <Badge tone="brand">{data.citas?.length} hoy</Badge>
        </div>
        <ul className="divide-y divide-slate-100">
          {(data.citas ?? []).map((c, i) => (
            <li key={i} className="flex items-center gap-4 p-5">
              <Avatar name={c.paciente} />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900">{c.paciente}</p>
                <p className="truncate text-sm text-slate-500">{c.profesional} · {c.especialidad}</p>
              </div>
              <span className="hidden text-sm font-medium text-slate-600 sm:block">{c.hora}</span>
              <Badge tone={tone(c.estado)}>{c.estado}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
