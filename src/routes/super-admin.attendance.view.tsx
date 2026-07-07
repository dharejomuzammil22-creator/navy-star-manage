import { createFileRoute } from "@tanstack/react-router";
import { SuperPage } from "@/components/SuperPage";
import { SectionCard, StatusBadge } from "@/components/ui-bits";
import { students } from "@/lib/mock-data";

export const Route = createFileRoute("/super-admin/attendance/view")({
  component: ViewAttendance,
});

function ViewAttendance() {
  const rows = students.slice(0, 20).map((s, i) => {
    const present = 60 + ((i * 7) % 20);
    const total = 80;
    return { ...s, present, total, pct: Math.round((present / total) * 100) };
  });

  return (
    <SuperPage title="View Attendance" subtitle="History of daily attendance across all campuses.">
      <SectionCard title="Attendance Records">
        <div className="overflow-x-auto -mx-5 -my-5">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-4 py-3">Roll</th>
                <th className="text-left font-medium px-4 py-3">Student</th>
                <th className="text-left font-medium px-4 py-3">Course</th>
                <th className="text-left font-medium px-4 py-3">Campus</th>
                <th className="text-right font-medium px-4 py-3">Present</th>
                <th className="text-right font-medium px-4 py-3">%</th>
                <th className="text-right font-medium px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/40">
                  <td className="px-4 py-3 font-mono text-xs">{r.roll}</td>
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.course}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.campus}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.present} / {r.total}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium">{r.pct}%</td>
                  <td className="px-4 py-3 text-right">
                    <StatusBadge status={r.pct >= 75 ? "active" : "pending"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </SuperPage>
  );
}
