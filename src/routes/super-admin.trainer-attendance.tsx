import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SuperPage } from "@/components/SuperPage";
import { SectionCard } from "@/components/ui-bits";
import { trainers } from "@/lib/mock-data";
import { UserCheck, Filter, Search, Download, Pencil, Printer } from "lucide-react";

export const Route = createFileRoute("/super-admin/trainer-attendance")({
  component: ViewTrainerAttendance,
});

type Row = {
  id: string;
  trainer: string;
  schedule: string;
  campus: string;
  checkIn: { date: string; time: string; late?: string } | null;
  checkOut: { date: string; time: string } | null;
  duration: string;
  status: "default" | "present" | "absent";
};

const schedules = [
  "Mon 10:00 AM - 12:00 PM | Wed 10:00 AM - 12:00 PM",
  "Mon 08:00 AM - 10:00 AM | Wed 08:00 AM - 10:00 AM",
  "Wed 12:00 PM - 02:00 PM | Fri 12:00 PM - 02:00 PM",
  "Mon 02:00 PM - 04:00 PM | Fri 02:00 PM - 04:00 PM",
  "Wed 04:00 PM - 06:00 PM | Fri 04:00 PM - 06:00 PM",
];

function buildRows(): Row[] {
  const dates = [
    { d: "Sun, Jul 12, 2026", inT: "10:46 AM", late: "46m", outT: null, dur: "0m" },
    { d: "Fri, Jul 10, 2026", inT: "08:05 AM", late: "5m", outT: null, dur: "0m" },
    { d: "Wed, Jul 08, 2026", inT: "12:28 PM", late: "28m", outT: "04:36 PM", dur: "1h 32m" },
    { d: "Mon, Jul 06, 2026", inT: "08:03 AM", late: "3m", outT: "11:10 AM", dur: "1h 57m" },
    { d: "Fri, Jul 03, 2026", inT: "08:04 AM", late: "4m", outT: null, dur: "0m" },
    { d: "Wed, Jul 01, 2026", inT: "09:59 AM", late: undefined, outT: "01:04 PM", dur: "3h 05m" },
    { d: "Mon, Jun 29, 2026", inT: "10:12 AM", late: "12m", outT: "12:35 PM", dur: "2h 23m" },
    { d: "Fri, Jun 26, 2026", inT: "08:00 AM", late: undefined, outT: "10:15 AM", dur: "2h 15m" },
  ];
  return dates.map((d, i) => {
    const t = trainers[i % trainers.length];
    return {
      id: `${t.id}-${i}`,
      trainer: t.name,
      schedule: schedules[i % schedules.length],
      campus: t.campus,
      checkIn: { date: d.d, time: d.inT, late: d.late },
      checkOut: d.outT ? { date: d.d, time: d.outT } : null,
      duration: d.dur,
      status: "default",
    };
  });
}

function ViewTrainerAttendance() {
  const [rows, setRows] = useState<Row[]>(buildRows());
  const [q, setQ] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [campusFilter, setCampusFilter] = useState("");

  const campuses = useMemo(() => Array.from(new Set(rows.map((r) => r.campus))), [rows]);

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return rows.filter((r) => {
      if (campusFilter && r.campus !== campusFilter) return false;
      if (!needle) return true;
      return (
        r.trainer.toLowerCase().includes(needle) ||
        r.campus.toLowerCase().includes(needle) ||
        r.schedule.toLowerCase().includes(needle)
      );
    });
  }, [rows, q, campusFilter]);

  const exportCsv = () => {
    const header = ["Trainer", "Slot Schedule", "Campus", "Check In", "Check Out", "Duration", "Status"];
    const body = filtered.map((r) => [
      r.trainer,
      r.schedule,
      r.campus,
      r.checkIn ? `${r.checkIn.date} ${r.checkIn.time}${r.checkIn.late ? ` (Late ${r.checkIn.late})` : ""}` : "-",
      r.checkOut ? `${r.checkOut.date} ${r.checkOut.time}` : "-",
      r.duration,
      r.status,
    ]);
    const csv = [header, ...body].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "trainer-attendance.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const editRow = (id: string) => {
    const r = rows.find((x) => x.id === id);
    if (!r) return;
    const status = window.prompt("Set status (default / present / absent)", r.status);
    if (!status) return;
    setRows((prev) => prev.map((x) => (x.id === id ? { ...x, status: status as Row["status"] } : x)));
  };

  return (
    <SuperPage
      title="View Trainer Attendance"
      subtitle="Daily check-in / check-out logs for all trainers."
      stats={[
        { label: "Total Records", value: rows.length, icon: <UserCheck className="h-5 w-5" /> },
        { label: "Present Today", value: trainers.length - 2, tone: "success" },
        { label: "Late Arrivals", value: rows.filter((r) => r.checkIn?.late).length, tone: "gold" },
        { label: "Missing Check-out", value: rows.filter((r) => !r.checkOut).length },
      ]}
    >
      <SectionCard title="Attendance Log">
        <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
          <button
            onClick={() => window.print()}
            className="h-9 w-9 grid place-items-center rounded-full border border-border hover:bg-accent"
            aria-label="Print"
            title="Print"
          >
            <Printer className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="h-9 inline-flex items-center gap-1.5 px-3 rounded-md border border-border text-sm hover:bg-accent"
          >
            <Filter className="h-4 w-4" /> Filters
          </button>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/80" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="h-9 pl-8 pr-3 rounded-md bg-primary text-primary-foreground placeholder:text-primary-foreground/70 text-sm outline-none"
            />
          </div>
          <button
            onClick={exportCsv}
            className="h-9 inline-flex items-center gap-1.5 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Export
          </button>
        </div>

        {showFilters && (
          <div className="mb-4 rounded-md border border-border bg-muted/30 p-3 flex flex-wrap items-center gap-3">
            <div className="text-xs text-muted-foreground">Campus</div>
            <select
              value={campusFilter}
              onChange={(e) => setCampusFilter(e.target.value)}
              className="h-8 px-2 rounded-md border border-input bg-background text-sm"
            >
              <option value="">All campuses</option>
              {campuses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setCampusFilter("");
                setQ("");
              }}
              className="ml-auto text-xs text-primary hover:underline"
            >
              Clear
            </button>
          </div>
        )}

        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left font-semibold px-4 py-3">Trainer</th>
                <th className="text-left font-semibold px-4 py-3">Slot Schedule</th>
                <th className="text-left font-semibold px-4 py-3">Campus</th>
                <th className="text-left font-semibold px-4 py-3">Check In</th>
                <th className="text-left font-semibold px-4 py-3">Check Out</th>
                <th className="text-left font-semibold px-4 py-3">Duration</th>
                <th className="text-left font-semibold px-4 py-3">Status</th>
                <th className="text-left font-semibold px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/40 align-top">
                  <td className="px-4 py-4 font-medium">{r.trainer}</td>
                  <td className="px-4 py-4 text-muted-foreground max-w-xs">{r.schedule}</td>
                  <td className="px-4 py-4 text-muted-foreground">{r.campus}</td>
                  <td className="px-4 py-4">
                    {r.checkIn ? (
                      <div className="space-y-1">
                        <div>{r.checkIn.date},</div>
                        <div>{r.checkIn.time}</div>
                        {r.checkIn.late && (
                          <span className="inline-block rounded bg-destructive/15 text-destructive text-[11px] px-1.5 py-0.5">
                            Late: {r.checkIn.late}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {r.checkOut ? (
                      <div className="space-y-1">
                        <div>{r.checkOut.date},</div>
                        <div>{r.checkOut.time}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 tabular-nums">{r.duration}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center rounded border border-primary/40 text-primary bg-primary/5 text-xs px-2 py-0.5 capitalize">
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => editRow(r.id)}
                      className="h-8 w-8 grid place-items-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
                      aria-label="Edit"
                      title="Edit status"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No attendance records match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </SuperPage>
  );
}
