import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/ui-bits";
import { BookOpen, Users, ClipboardList } from "lucide-react";
import { assignments } from "@/lib/mock-data";

export const Route = createFileRoute("/trainer/")({
  component: TrainerDashboard,
});

const myCourses = [
  { name: "Web & Mobile App", progress: 62, students: 45, schedule: "Mon/Wed/Fri 4–6 PM", start: "May 2026" },
  { name: "Cloud Computing", progress: 38, students: 32, schedule: "Tue/Thu 6–8 PM", start: "Jun 2026" },
  { name: "UI/UX Design", progress: 84, students: 28, schedule: "Sat/Sun 10 AM–1 PM", start: "Mar 2026" },
];

const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const teaching = [true, false, true, false, true, false, false];

function TrainerDashboard() {
  return (
    <>
      <PageHeader title="Welcome back, Bilal" subtitle="Your courses, schedule and student activity." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Active Courses" value={3} icon={<BookOpen className="h-5 w-5" />} tone="gold" />
        <StatCard label="Enrolled Students" value={105} icon={<Users className="h-5 w-5" />} />
        <StatCard label="Total Assignments" value={assignments.length} icon={<ClipboardList className="h-5 w-5" />} />
      </div>

      <SectionCard title="Weekly Schedule">
        <div className="grid grid-cols-7 gap-2">
          {week.map((d, i) => (
            <div
              key={d}
              className={`rounded-lg p-3 text-center text-sm ${
                teaching[i] ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <div className="text-xs opacity-70">{d}</div>
              <div className="mt-1 font-medium">{teaching[i] ? "Class" : "Off"}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {myCourses.map((c) => (
          <div key={c.name} className="rounded-xl border border-border bg-card p-5">
            <div className="font-display text-lg">{c.name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{c.schedule} · Started {c.start}</div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Course Progress</span>
                <span className="tabular-nums">{c.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full" style={{ width: `${c.progress}%`, background: "var(--gradient-gold)" }} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{c.students} students</span>
              <Link to="/trainer/attendance" className="text-primary hover:underline">Open →</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
