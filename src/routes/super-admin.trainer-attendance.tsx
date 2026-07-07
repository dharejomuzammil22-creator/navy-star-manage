import { createFileRoute } from "@tanstack/react-router";
import { SuperPage, SimpleTable } from "@/components/SuperPage";
import { StatusBadge } from "@/components/ui-bits";
import { trainers } from "@/lib/mock-data";
import { UserCheck } from "lucide-react";

export const Route = createFileRoute("/super-admin/trainer-attendance")({
  component: () => (
    <SuperPage
      title="Trainer Attendance"
      subtitle="Daily attendance for all trainers"
      stats={[
        { label: "Total Trainers", value: trainers.length, icon: <UserCheck className="h-5 w-5" /> },
        { label: "Present", value: trainers.length - 2, tone: "success" },
        { label: "Absent", value: 2 },
        { label: "On Leave", value: 1, tone: "gold" },
      ]}
    >
      <SimpleTable
        columns={["Emp ID", "Name", "Campus", "Check-in", "Check-out", "Status"]}
        rows={trainers.map((t, i) => [
          t.id,
          t.name,
          t.campus,
          "09:0" + (i % 9) + " AM",
          "05:1" + (i % 9) + " PM",
          <StatusBadge key={t.id} status={i === 2 || i === 7 ? "pending" : "approved"} />,
        ])}
      />
    </SuperPage>
  ),
});
