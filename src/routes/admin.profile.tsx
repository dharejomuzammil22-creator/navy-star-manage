import { createFileRoute } from "@tanstack/react-router";
import { PortalProfile } from "@/components/PortalProfile";
import { SectionCard } from "@/components/ui-bits";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/profile")({
  component: ProfilePage,
});

const permissions = [
  ["Dashboard", ["Read"]],
  ["Students", ["Read", "Write", "Update", "Export"]],
  ["Attendance", ["View", "Mark", "Multi"]],
  ["Slots", ["Read", "Write", "Update"]],
  ["Trainers", ["Read", "Write", "Update"]],
  ["Trainer Attendance", ["View", "Mark"]],
  ["Updation", ["Update"]],
] as const;

function ProfilePage() {
  return (
    <PortalProfile
      title="My Profile"
      subtitle="Your account, role and permissions."
      nameKey="name"
      emailKey="email"
      roleLabel="Admin"
      initials="AM"
      fields={[
        { key: "name", label: "Full Name", value: "Ayesha Malik" },
        { key: "email", label: "Email", value: "admin@titan.edu.pk", type: "email" },
        { key: "phone", label: "Phone", value: "+92 300 9876543", type: "tel" },
        { key: "city", label: "City", value: "Karachi" },
        { key: "campus", label: "Campus", value: "Karachi Main" },
        { key: "joined", label: "Joined", value: "Feb 2025", editable: false },
      ]}
      extra={
        <SectionCard title="Permissions">
          <div className="divide-y divide-border">
            {permissions.map(([mod, acts]) => (
              <div key={mod} className="py-3 flex items-center justify-between gap-4">
                <div className="font-medium text-sm">{mod}</div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {acts.map((a) => (
                    <span key={a} className="inline-flex items-center gap-1 rounded-full bg-success/15 text-success text-[10px] px-2 py-0.5">
                      <CheckCircle2 className="h-3 w-3" /> {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      }
    />
  );
}
