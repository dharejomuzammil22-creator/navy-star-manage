import { createFileRoute } from "@tanstack/react-router";
import { SuperPage, SimpleTable } from "@/components/SuperPage";
import { StatusBadge } from "@/components/ui-bits";
import { UserCog, Plus } from "lucide-react";

const users = [
  { name: "Zaid Rehman", email: "zaid@titan.edu.pk", role: "SUPER_ADMIN", campus: "All", status: "active" },
  { name: "Ayesha Malik", email: "ayesha@titan.edu.pk", role: "ADMIN", campus: "Karachi Main", status: "active" },
  { name: "Bilal Ahmed", email: "bilal@titan.edu.pk", role: "TRAINER", campus: "Lahore Gulberg", status: "active" },
  { name: "Fahad Qureshi", email: "fahad@titan.edu.pk", role: "TRAINER", campus: "Islamabad F-8", status: "active" },
  { name: "Sara Khan", email: "sara@titan.edu.pk", role: "CAMPUS_ADMIN", campus: "Sukkur", status: "pending" },
  { name: "Hina Sheikh", email: "hina@titan.edu.pk", role: "SUB_ADMIN", campus: "Multan", status: "active" },
];

export const Route = createFileRoute("/super-admin/users")({
  component: () => (
    <SuperPage
      title="Users"
      subtitle={`${users.length} system users`}
      actions={
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add User
        </button>
      }
      stats={[
        { label: "Total Users", value: users.length, icon: <UserCog className="h-5 w-5" />, tone: "gold" },
        { label: "Active", value: users.filter((u) => u.status === "active").length, tone: "success" },
        { label: "Pending", value: users.filter((u) => u.status === "pending").length },
        { label: "Roles", value: 6 },
      ]}
    >
      <SimpleTable
        columns={["Name", "Email", "Role", "Campus", "Status"]}
        rows={users.map((u) => [
          u.name,
          u.email,
          <span key={u.email} className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary rounded-full px-2 py-0.5 font-semibold">
            {u.role}
          </span>,
          u.campus,
          <StatusBadge key={u.email} status={u.status} />,
        ])}
      />
    </SuperPage>
  ),
});
