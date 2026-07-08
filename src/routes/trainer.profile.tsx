import { createFileRoute } from "@tanstack/react-router";
import { PortalProfile } from "@/components/PortalProfile";
import { SectionCard } from "@/components/ui-bits";
import { Download } from "lucide-react";

export const Route = createFileRoute("/trainer/profile")({
  component: TrainerProfile,
});

function TrainerProfile() {
  return (
    <PortalProfile
      title="My Profile"
      subtitle="Trainer account, editable profile photos and ID card."
      nameKey="name"
      emailKey="email"
      roleLabel="Trainer"
      initials="BA"
      fields={[
        { key: "name", label: "Full Name", value: "Bilal Ahmed" },
        { key: "email", label: "Email", value: "trainer@titan.edu.pk", type: "email" },
        { key: "phone", label: "Phone", value: "+92 300 1234567", type: "tel" },
        { key: "employee", label: "Employee ID", value: "EMP-202", editable: false },
        { key: "campus", label: "Campus", value: "Karachi Main" },
        { key: "course", label: "Primary Course", value: "Web & Mobile App" },
        { key: "rate", label: "Hourly Rate", value: "2500", type: "number" },
        { key: "city", label: "City", value: "Karachi" },
      ]}
      extra={
        <SectionCard title="ID Card">
          <div className="rounded-xl overflow-hidden border border-border" style={{ background: "var(--gradient-navy)" }}>
            <div className="p-5 text-sidebar-foreground">
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold">TITAN · Trainer</div>
              <div className="mt-3 font-medium text-lg">Bilal Ahmed</div>
              <div className="text-xs text-sidebar-foreground/70">EMP-202 · Karachi Main</div>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs bg-black/20 text-white hover:bg-black/30"
            >
              <Download className="h-3.5 w-3.5" /> Download / Print
            </button>
          </div>
        </SectionCard>
      }
    />
  );
}
