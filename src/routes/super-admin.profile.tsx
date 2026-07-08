import { createFileRoute } from "@tanstack/react-router";
import { PortalProfile } from "@/components/PortalProfile";
import { SectionCard } from "@/components/ui-bits";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/super-admin/profile")({
  component: ProfilePage,
});

const permissions = [
  "manage.users", "manage.roles", "manage.students", "manage.trainers",
  "manage.campuses", "manage.courses", "manage.batches", "manage.slots",
  "manage.attendance", "manage.registrations", "manage.payments",
  "view.reports", "view.activity", "manage.settings", "manage.notifications",
];

function ProfilePage() {
  return (
    <PortalProfile
      title="Profile"
      subtitle="Your Super Admin account"
      nameKey="name"
      emailKey="email"
      roleLabel="Super Admin"
      roleTone="gold"
      initials="ZR"
      fields={[
        { key: "name", label: "Full Name", value: "Zaid Rehman" },
        { key: "email", label: "Email", value: "zaid@titan.edu.pk", type: "email" },
        { key: "phone", label: "Phone", value: "+92 300 1234567", type: "tel" },
        { key: "role", label: "Role", value: "SUPER_ADMIN", editable: false },
        { key: "campus", label: "Campus", value: "All Campuses", editable: false },
        { key: "country", label: "Country", value: "Pakistan" },
        { key: "city", label: "City", value: "Karachi" },
        { key: "joined", label: "Joined", value: "Jan 2025", editable: false },
      ]}
      extra={
        <SectionCard title="Permissions">
          <div className="flex flex-wrap gap-2">
            {permissions.map((permission) => (
              <span key={permission} className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs font-medium">
                <ShieldCheck className="h-3 w-3" /> {permission}
              </span>
            ))}
          </div>
        </SectionCard>
      }
    />
  );
}
