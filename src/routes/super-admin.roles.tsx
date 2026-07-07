import { createFileRoute } from "@tanstack/react-router";
import { SuperPage } from "@/components/SuperPage";
import { SectionCard } from "@/components/ui-bits";
import { KeyRound, Check } from "lucide-react";

const roles = [
  { name: "SUPER_ADMIN", desc: "Full system access", users: 2, perms: 32 },
  { name: "ADMIN", desc: "Institute-wide management", users: 6, perms: 24 },
  { name: "CAMPUS_ADMIN", desc: "Single-campus management", users: 14, perms: 18 },
  { name: "SUB_ADMIN", desc: "Limited administrative tasks", users: 22, perms: 10 },
  { name: "TRAINER", desc: "Teaching & attendance", users: 96, perms: 8 },
  { name: "STUDENT", desc: "Personal portal only", users: 2103, perms: 4 },
];

const matrix = [
  "manage.users",
  "manage.students",
  "manage.trainers",
  "manage.campuses",
  "manage.payments",
  "view.reports",
  "manage.settings",
];

export const Route = createFileRoute("/super-admin/roles")({
  component: () => (
    <SuperPage
      title="Roles & Permissions"
      subtitle="Configure what each role can do"
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {roles.map((r) => (
          <div key={r.name} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                  {r.name}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{r.desc}</div>
              </div>
              <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <KeyRound className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                <b className="text-foreground">{r.users}</b> users
              </span>
              <span className="text-muted-foreground">
                <b className="text-foreground">{r.perms}</b> permissions
              </span>
            </div>
          </div>
        ))}
      </div>
      <SectionCard title="Permission Matrix">
        <div className="overflow-x-auto -mx-5 -my-5">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-4 py-3">Permission</th>
                {roles.map((r) => (
                  <th key={r.name} className="text-center font-medium px-3 py-3">
                    {r.name.split("_")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((p) => (
                <tr key={p} className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs">{p}</td>
                  {roles.map((r, i) => (
                    <td key={r.name} className="text-center px-3 py-3">
                      {i <= 2 || (i <= 3 && p !== "manage.settings") ? (
                        <Check className="inline h-4 w-4 text-success" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </SuperPage>
  ),
});
