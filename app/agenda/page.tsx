"use client";
export const dynamic = "force-dynamic";
import { AppointmentScheduler } from "@/components/ui/AppointmentScheduler";
import { PageHeader } from "@/components/ui/PageHeader";
export default function AgendaPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Agenda de citas" subtitle="Reserva en los horarios libres de cada profesional." />
      <AppointmentScheduler />
    </div>
  );
}
