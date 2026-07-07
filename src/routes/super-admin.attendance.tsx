import { createFileRoute } from "@tanstack/react-router";
import { SuperPage, SimpleTable } from "@/components/SuperPage";
import { StatusBadge } from "@/components/ui-bits";
import { students } from "@/lib/mock-data";
import { ClipboardCheck, Users, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/super-admin/attendance")({
  component: () => {
    const present = Math.floor(students.length * 0.82);
    return (
      <SuperPage
        title="Attendance"
        subtitle="Institute-wide attendance snapshot for today"
        stats={[
          { label: "Marked Today", value: students.length, icon: <ClipboardCheck className="h-5 w-5" /> },
          { label: "Present", value: present, icon: <CheckCircle2 className="h-5 w-5" />, tone: "success" },
          { label: "Absent", value: students.length - present, icon: <XCircle className="h-5 w-5" /> },
          { label: "Students", value: students.length, icon: <Users className="h-5 w-5" />, tone: "gold" },
        ]}
      >
        <SimpleTable
          columns={["Roll #", "Name", "Course", "Campus", "Status"]}
          rows={students.slice(0, 12).map((s, i) => [
            s.roll,
            s.name,
            s.course,
            s.campus,
            <StatusBadge key={s.id} status={i % 5 === 0 ? "pending" : "approved"} />,
          ])}
        />
      </SuperPage>
    );
  },
});
