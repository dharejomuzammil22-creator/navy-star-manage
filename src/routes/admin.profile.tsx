import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/ui-bits";
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
    <>
      <PageHeader title="My Profile" subtitle="Your account, role and permissions." />
      <div className="grid lg:grid-cols-3 gap-6">
        <SectionCard title="Account">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground grid place-items-center text-lg font-semibold">
              AM
            </div>
            <div>
              <div className="font-medium">Ayesha Malik</div>
              <div className="text-sm text-muted-foreground">admin@titan.edu.pk</div>
              <span className="mt-1 inline-block rounded-full bg-gold/20 text-gold-foreground text-[10px] px-2 py-0.5">
                Super Admin
              </span>
            </div>
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">City</span><span>Karachi</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Campus</span><span>Karachi Main</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Joined</span><span>Feb 2025</span></div>
          </div>
          <button className="mt-5 w-full h-9 rounded-md border border-border text-sm hover:bg-accent">Change Password</button>
        </SectionCard>

        <div className="lg:col-span-2">
          <SectionCard title="Permissions">
            <div className="divide-y divide-border">
              {permissions.map(([mod, acts]) => (
                <div key={mod} className="py-3 flex items-center justify-between">
                  <div className="font-medium text-sm">{mod}</div>
                  <div className="flex flex-wrap gap-1.5">
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
        </div>
      </div>
    </>
  );
}
