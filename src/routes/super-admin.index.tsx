import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/ui-bits";
import { stats, campusChart, courseChart } from "@/lib/mock-data";
import {
  Users,
  GraduationCap,
  Building2,
  MapPin,
  CalendarClock,
  BookOpen,
  UserPlus,
  Wallet,
} from "lucide-react";

export const Route = createFileRoute("/super-admin/")({
  component: SuperDashboard,
});

function BarRow({ name, value, max }: { name: string; value: number; max: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="grid grid-cols-[160px_1fr_60px] items-center gap-3 py-2">
      <div className="text-sm text-foreground truncate">{name}</div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: "var(--gradient-navy)" }}
        />
      </div>
      <div className="text-right text-sm font-medium text-foreground tabular-nums">{value}</div>
    </div>
  );
}

function SuperDashboard() {
  const maxCampus = Math.max(...campusChart.map((c) => c.students));
  const maxCourse = Math.max(...courseChart.map((c) => c.students));
  const revenue = 18_450_000;

  return (
    <>
      <PageHeader
        title="Super Admin Dashboard"
        subtitle="Complete oversight across every city, campus, course and user."
        actions={
          <select className="h-9 px-3 rounded-md border border-border bg-card text-sm">
            <option>This year · 2026</option>
            <option>Last year · 2025</option>
            <option>All time</option>
          </select>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Students" value={stats.totalStudents.toLocaleString()} icon={<Users className="h-5 w-5" />} tone="gold" />
        <StatCard label="Trainers" value={stats.trainers} icon={<GraduationCap className="h-5 w-5" />} />
        <StatCard label="Campuses" value={stats.campuses} icon={<Building2 className="h-5 w-5" />} />
        <StatCard label="Cities" value={stats.cities} icon={<MapPin className="h-5 w-5" />} />
        <StatCard label="Courses" value={stats.courses} icon={<BookOpen className="h-5 w-5" />} />
        <StatCard label="Active Slots" value={stats.activeSlots} icon={<CalendarClock className="h-5 w-5" />} />
        <StatCard label="Registrations" value={stats.openRegistrations} icon={<UserPlus className="h-5 w-5" />} tone="success" />
        <StatCard label="Revenue (PKR)" value={`₨ ${(revenue / 1_000_000).toFixed(1)}M`} icon={<Wallet className="h-5 w-5" />} tone="gold" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <SectionCard title="Campus Analytics">
          <div>
            {campusChart
              .slice()
              .sort((a, b) => b.students - a.students)
              .map((c) => (
                <BarRow key={c.name} name={c.name} value={c.students} max={maxCampus} />
              ))}
          </div>
        </SectionCard>
        <SectionCard title="Course Analytics">
          <div>
            {courseChart
              .slice()
              .sort((a, b) => b.students - a.students)
              .map((c) => (
                <BarRow key={c.name} name={c.name} value={c.students} max={maxCourse} />
              ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Recent Activity">
        <ul className="divide-y divide-border text-sm">
          {[
            { u: "Ayesha Malik", a: "approved registration", t: "TIT-2026-1023", when: "2m ago" },
            { u: "Bilal Ahmed", a: "marked attendance for", t: "AI · Batch 3", when: "18m ago" },
            { u: "System", a: "generated fee vouchers for", t: "July 2026", when: "1h ago" },
            { u: "Zaid Rehman", a: "added trainer", t: "Fahad Qureshi", when: "3h ago" },
            { u: "Hina Sheikh", a: "uploaded assignment", t: "Portfolio Site", when: "yesterday" },
          ].map((row, i) => (
            <li key={i} className="flex items-center justify-between py-3">
              <div>
                <span className="font-medium text-foreground">{row.u}</span>{" "}
                <span className="text-muted-foreground">{row.a}</span>{" "}
                <span className="font-medium text-foreground">{row.t}</span>
              </div>
              <div className="text-xs text-muted-foreground">{row.when}</div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}
