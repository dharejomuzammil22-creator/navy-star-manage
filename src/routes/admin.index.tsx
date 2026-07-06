import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/ui-bits";
import { stats, campusChart, courseChart } from "@/lib/mock-data";
import { Users, GraduationCap, Building2, MapPin, CalendarClock, BookOpen, UserCheck, DoorOpen } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
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

function AdminDashboard() {
  const maxCampus = Math.max(...campusChart.map((c) => c.students));
  const maxCourse = Math.max(...courseChart.map((c) => c.students));

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Institute-wide overview across every city and campus."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Students" value={stats.totalStudents.toLocaleString()} icon={<Users className="h-5 w-5" />} tone="gold" />
        <StatCard label="Enrolled" value={stats.enrolledStudents.toLocaleString()} icon={<UserCheck className="h-5 w-5" />} />
        <StatCard label="Courses" value={stats.courses} icon={<BookOpen className="h-5 w-5" />} />
        <StatCard label="Trainers" value={stats.trainers} icon={<GraduationCap className="h-5 w-5" />} />
        <StatCard label="Cities" value={stats.cities} icon={<MapPin className="h-5 w-5" />} />
        <StatCard label="Campuses" value={stats.campuses} icon={<Building2 className="h-5 w-5" />} />
        <StatCard label="Active Slots" value={stats.activeSlots} icon={<CalendarClock className="h-5 w-5" />} />
        <StatCard label="Registration Open" value={stats.openRegistrations} icon={<DoorOpen className="h-5 w-5" />} tone="success" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Students per Campus">
          <div>
            {campusChart
              .slice()
              .sort((a, b) => b.students - a.students)
              .map((c) => (
                <BarRow key={c.name} name={c.name} value={c.students} max={maxCampus} />
              ))}
          </div>
        </SectionCard>
        <SectionCard title="Students per Course">
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
    </>
  );
}
