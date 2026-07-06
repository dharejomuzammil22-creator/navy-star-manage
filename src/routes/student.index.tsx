import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard, StatusBadge } from "@/components/ui-bits";
import { ClipboardCheck, FileText, Trophy } from "lucide-react";
import { studentSchedule, vouchers, assignments } from "@/lib/mock-data";

export const Route = createFileRoute("/student/")({
  component: StudentDashboard,
});

function StudentDashboard() {
  return (
    <>
      <PageHeader title="Assalam-o-Alaikum, Hassan" subtitle="Web & Mobile App · Batch 3 · Karachi Main" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Attendance" value="65 / 80" hint="81% present" icon={<ClipboardCheck className="h-5 w-5" />} tone="success" />
        <StatCard label="Assignments" value="9 / 13" hint="4 pending" icon={<FileText className="h-5 w-5" />} />
        <StatCard label="Course Progress" value="62%" hint="On track" icon={<Trophy className="h-5 w-5" />} tone="gold" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="This Week">
            <ul className="divide-y divide-border">
              {studentSchedule.map((s) => (
                <li key={s.day} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.day}</div>
                    <div className="font-medium">{s.topic}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{s.time}</div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Upcoming Assignments">
            <ul className="divide-y divide-border">
              {assignments.map((a) => (
                <li key={a.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.title}</div>
                    <div className="text-xs text-muted-foreground">{a.course} · Due {a.due}</div>
                  </div>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <SectionCard title="Fee Vouchers">
          <ul className="divide-y divide-border">
            {vouchers.map((v) => (
              <li key={v.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs">{v.id}</div>
                  <StatusBadge status={v.status} />
                </div>
                <div className="mt-1 text-sm">{v.type} · {v.month}</div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Due {v.due}</span>
                  <span className="text-foreground font-medium">Rs {v.amount.toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </>
  );
}
