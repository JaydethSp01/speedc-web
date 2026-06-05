export const dynamic = "force-dynamic";
import "./globals.css";
import { ProtectedShell } from "@/components/ui/ProtectedShell";

const NAV = [{ href: "/", label: "Inicio" }, { href: "/agenda", label: "Agenda" }, { href: "/cita", label: "Citas" }, { href: "/especialidad", label: "Especialidad" }, { href: "/horario", label: "Horario" }, { href: "/paciente", label: "Pacientes" }, { href: "/profesional", label: "Profesionales" }, { href: "/usuarios", label: "Usuarios" }];

export const metadata = { title: "Clinica C", description: "Generado con ScrumDev AI" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ProtectedShell items={NAV} title="Clinica C">{children}</ProtectedShell>
      </body>
    </html>
  );
}
