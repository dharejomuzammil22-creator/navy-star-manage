import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, SectionCard, StatusBadge } from "@/components/ui-bits";
import { trainers } from "@/lib/mock-data";
import { Search, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/trainer-attendance/request")({
  component: AttendanceRequest,
});

type ReqStatus = "pending" | "approved" | "rejected";
interface Req {
  id: string;
  trainer: string;
  campus: string;
  schedule: string;
  checkIn: string;
  checkOut: string;
  type: string;
  status: ReqStatus;
  reason: string;
  date: string;
}

const seed: Req[] = trainers.slice(0, 6).map((t, i) => ({
  id: `AR-${1000 + i}`,
  trainer: t.name,
  campus: t.campus,
  schedule: "Mon, Wed, Fri · 05:00 - 07:00 PM",
  checkIn: i % 2 === 0 ? "05:22 PM" : "—",
  checkOut: i % 2 === 0 ? "07:00 PM" : "—",
  type: ["Late Arrival", "Leave", "Early Leave", "Missed Punch"][i % 4],
  status: (["pending", "approved", "rejected"] as ReqStatus[])[i % 3],
  reason: "Personal reason.",
  date: `2026-07-${10 + i}`,
}));

function AttendanceRequest() {
  const [rows, setRows] = useState<Req[]>(seed);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"" | ReqStatus>("");

  const filtered = useMemo(() => rows.filter((r) => {
    if (status && r.status !== status) return false;
    const n = q.toLowerCase().trim();
    if (!n) return true;
    return r.trainer.toLowerCase().includes(n) || r.campus.toLowerCase().includes(n) || r.type.toLowerCase().includes(n);
  }), [rows, q, status]);

  const setStatusFor = (id: string, s: ReqStatus) => {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, status: s } : r)));
  };

  return (
    <>
      <PageHeader title="Trainer Attendance Requests" subtitle="Review and act on trainer attendance corrections." />
      <SectionCard title={`Requests (${filtered.length})`}>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search trainer, campus, type" className="w-full h-9 pl-8 pr-3 rounded-md border border-input bg-background text-sm outline-none" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value as "" | ReqStatus)} className="h-9 px-2 rounded-md border border-input bg-background text-sm">
            <option value="">All status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-muted/40">
              <tr>
                <th className="text-left font-semibold px-4 py-3">Trainer</th>
                <th className="text-left font-semibold px-4 py-3">Campus</th>
                <th className="text-left font-semibold px-4 py-3">Schedule</th>
                <th className="text-left font-semibold px-4 py-3">Check In</th>
                <th className="text-left font-semibold px-4 py-3">Check Out</th>
                <th className="text-left font-semibold px-4 py-3">Type</th>
                <th className="text-left font-semibold px-4 py-3">Status</th>
                <th className="text-left font-semibold px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium">{r.trainer}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.campus}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{r.schedule}</td>
                  <td className="px-4 py-3">{r.checkIn}</td>
                  <td className="px-4 py-3">{r.checkOut}</td>
                  <td className="px-4 py-3">{r.type}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setStatusFor(r.id, "approved")} className="h-7 w-7 grid place-items-center rounded-md border border-success/40 text-success hover:bg-success/10" title="Approve">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => setStatusFor(r.id, "rejected")} className="h-7 w-7 grid place-items-center rounded-md border border-destructive/40 text-destructive hover:bg-destructive/10" title="Reject">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">No requests match.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </>
  );
}
