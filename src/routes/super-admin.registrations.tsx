import { createFileRoute } from "@tanstack/react-router";
import { SuperPage, SimpleTable } from "@/components/SuperPage";
import { StatusBadge } from "@/components/ui-bits";
import { students } from "@/lib/mock-data";
import { UserPlus } from "lucide-react";

export const Route = createFileRoute("/super-admin/registrations")({
  component: () => {
    const regs = students.slice(0, 18).map((s, i) => ({
      ...s,
      applied: `2026-06-${(10 + i).toString().padStart(2, "0")}`,
      status: ["pending", "approved", "rejected"][i % 3],
    }));
    return (
      <SuperPage
        title="Registrations"
        subtitle="Recent registration requests"
        stats={[
          { label: "Total", value: regs.length, icon: <UserPlus className="h-5 w-5" />, tone: "gold" },
          { label: "Pending", value: regs.filter((r) => r.status === "pending").length },
          { label: "Approved", value: regs.filter((r) => r.status === "approved").length, tone: "success" },
          { label: "Rejected", value: regs.filter((r) => r.status === "rejected").length },
        ]}
      >
        <SimpleTable
          columns={["Applied", "Name", "Course", "Campus", "Status"]}
          rows={regs.map((r) => [
            r.applied,
            r.name,
            r.course,
            r.campus,
            <StatusBadge key={r.id} status={r.status} />,
          ])}
        />
      </SuperPage>
    );
  },
});
