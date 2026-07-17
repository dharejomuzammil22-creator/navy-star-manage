import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SuperPage } from "@/components/SuperPage";
import { SectionCard, StatusBadge } from "@/components/ui-bits";
import { Drawer } from "@/components/Drawer";
import { trainers } from "@/lib/mock-data";
import { Filter, Search, Plus, Check, X, Inbox, Trash2 } from "lucide-react";

export const Route = createFileRoute("/super-admin/trainer-attendance-request")({
  component: TrainerAttendanceRequest,
});

type ReqType = "Late Arrival" | "Early Leave" | "Leave" | "Missed Punch";
type ReqStatus = "pending" | "approved" | "rejected";

interface AttReq {
  id: string;
  trainer: string;
  campus: string;
  schedule: string;
  checkIn: string;
  checkOut: string;
  type: ReqType;
  status: ReqStatus;
  reason: string;
  date: string;
}

const seed: AttReq[] = [
  {
    id: "AR-1001",
    trainer: trainers[0]?.name ?? "Trainer 1",
    campus: trainers[0]?.campus ?? "Karachi Main",
    schedule: "Mon, Wed, Fri · 05:00 - 07:00 PM",
    checkIn: "05:22 PM",
    checkOut: "07:00 PM",
    type: "Late Arrival",
    status: "pending",
    reason: "Traffic jam on Shahrah-e-Faisal.",
    date: "2026-07-15",
  },
  {
    id: "AR-1002",
    trainer: trainers[1]?.name ?? "Trainer 2",
    campus: trainers[1]?.campus ?? "Lahore Gulberg",
    schedule: "Mon, Wed, Fri · 03:00 - 05:00 PM",
    checkIn: "—",
    checkOut: "—",
    type: "Leave",
    status: "approved",
    reason: "Medical appointment.",
    date: "2026-07-13",
  },
  {
    id: "AR-1003",
    trainer: trainers[2]?.name ?? "Trainer 3",
    campus: trainers[2]?.campus ?? "Islamabad F-8",
    schedule: "Mon, Wed, Fri · 07:00 - 09:00 PM",
    checkIn: "07:02 PM",
    checkOut: "08:15 PM",
    type: "Early Leave",
    status: "rejected",
    reason: "Personal reason.",
    date: "2026-07-10",
  },
];

function TrainerAttendanceRequest() {
  const [rows, setRows] = useState<AttReq[]>(seed);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | ReqStatus>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [openNew, setOpenNew] = useState(false);
  const [form, setForm] = useState({
    trainer: trainers[0]?.name ?? "",
    campus: trainers[0]?.campus ?? "",
    schedule: "Mon, Wed, Fri · 05:00 - 07:00 PM",
    checkIn: "",
    checkOut: "",
    type: "Late Arrival" as ReqType,
    reason: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!q) return true;
      return (
        r.trainer.toLowerCase().includes(q) ||
        r.campus.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    });
  }, [rows, query, filter]);

  const allChecked = filtered.length > 0 && filtered.every((r) => selected.includes(r.id));
  const toggleAll = () =>
    setSelected(allChecked ? [] : filtered.map((r) => r.id));
  const toggleOne = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const setStatus = (id: string, status: ReqStatus) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
  const remove = (id: string) => {
    if (!confirm("Delete this attendance request?")) return;
    setRows((rs) => rs.filter((r) => r.id !== id));
    setSelected((s) => s.filter((x) => x !== id));
  };

  const submitNew = () => {
    if (!form.trainer.trim()) return alert("Select a trainer.");
    if (!form.reason.trim()) return alert("Please provide a reason.");
    const id = `AR-${1000 + rows.length + Math.floor(Math.random() * 900)}`;
    setRows((rs) => [
      {
        id,
        trainer: form.trainer,
        campus: form.campus,
        schedule: form.schedule,
        checkIn: form.checkIn || "—",
        checkOut: form.checkOut || "—",
        type: form.type,
        status: "pending",
        reason: form.reason,
        date: form.date,
      },
      ...rs,
    ]);
    setOpenNew(false);
    setForm({ ...form, reason: "", checkIn: "", checkOut: "" });
  };

  return (
    <SuperPage
      title="Trainer Attendance Requests"
      subtitle="Review, approve or reject trainer attendance adjustment requests."
      stats={[
        { label: "Total Requests", value: rows.length, icon: <Inbox className="h-5 w-5" /> },
        { label: "Pending", value: rows.filter((r) => r.status === "pending").length, tone: "gold" },
        { label: "Approved", value: rows.filter((r) => r.status === "approved").length, tone: "success" },
        { label: "Rejected", value: rows.filter((r) => r.status === "rejected").length },
      ]}
    >
      <SectionCard title="">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`inline-flex items-center gap-2 h-9 px-3 rounded-md border text-sm ${
                showFilters ? "border-primary text-primary bg-primary/5" : "border-border text-foreground"
              }`}
            >
              <Filter className="h-4 w-4" /> Filters
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </button>
            {selected.length > 0 && (
              <>
                <button
                  onClick={() => {
                    selected.forEach((id) => setStatus(id, "approved"));
                    setSelected([]);
                  }}
                  className="h-9 px-3 rounded-md bg-emerald-600 text-white text-sm inline-flex items-center gap-1"
                >
                  <Check className="h-4 w-4" /> Approve ({selected.length})
                </button>
                <button
                  onClick={() => {
                    selected.forEach((id) => setStatus(id, "rejected"));
                    setSelected([]);
                  }}
                  className="h-9 px-3 rounded-md bg-destructive text-destructive-foreground text-sm inline-flex items-center gap-1"
                >
                  <X className="h-4 w-4" /> Reject ({selected.length})
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trainer, campus, type…"
                className="h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm w-64 outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <button
              onClick={() => setOpenNew(true)}
              className="h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Generate Request
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {(["all", "pending", "approved", "rejected"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`h-8 px-3 rounded-full text-xs border capitalize ${
                  filter === k
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:border-primary/40"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        )}

        <div className="overflow-x-auto -mx-5 -my-5">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-primary" />
                </th>
                <th className="text-left font-medium px-4 py-3">Trainer</th>
                <th className="text-left font-medium px-4 py-3">Campus</th>
                <th className="text-left font-medium px-4 py-3">Schedule</th>
                <th className="text-left font-medium px-4 py-3">Check In</th>
                <th className="text-left font-medium px-4 py-3">Check Out</th>
                <th className="text-left font-medium px-4 py-3">Type</th>
                <th className="text-left font-medium px-4 py-3">Status</th>
                <th className="text-right font-medium px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center text-muted-foreground">
                    <Inbox className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    No data
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(r.id)}
                        onChange={() => toggleOne(r.id)}
                        className="accent-primary"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{r.trainer}</div>
                      <div className="text-xs text-muted-foreground">{r.id} · {r.date}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{r.campus}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.schedule}</td>
                    <td className="px-4 py-3 tabular-nums">{r.checkIn}</td>
                    <td className="px-4 py-3 tabular-nums">{r.checkOut}</td>
                    <td className="px-4 py-3">{r.type}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setStatus(r.id, "approved")}
                          title="Approve"
                          className="h-8 w-8 grid place-items-center rounded-md border border-border text-emerald-600 hover:bg-emerald-50"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setStatus(r.id, "rejected")}
                          title="Reject"
                          className="h-8 w-8 grid place-items-center rounded-md border border-border text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => remove(r.id)}
                          title="Delete"
                          className="h-8 w-8 grid place-items-center rounded-md border border-border text-muted-foreground hover:bg-muted"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Drawer
        open={openNew}
        onClose={() => setOpenNew(false)}
        title="Generate Attendance Request"
        subtitle="Raise a manual attendance adjustment on behalf of a trainer."
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpenNew(false)} className="h-9 px-3 rounded-md border border-border text-sm">
              Cancel
            </button>
            <button onClick={submitNew} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm">
              Submit Request
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium">Trainer</label>
            <select
              value={form.trainer}
              onChange={(e) => {
                const t = trainers.find((x) => x.name === e.target.value);
                setForm((f) => ({ ...f, trainer: e.target.value, campus: t?.campus ?? f.campus }));
              }}
              className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              {trainers.map((t) => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium">Campus</label>
              <input
                value={form.campus}
                onChange={(e) => setForm((f) => ({ ...f, campus: e.target.value }))}
                className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium">Schedule</label>
            <input
              value={form.schedule}
              onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))}
              className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium">Check In</label>
              <input
                value={form.checkIn}
                onChange={(e) => setForm((f) => ({ ...f, checkIn: e.target.value }))}
                placeholder="05:00 PM"
                className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium">Check Out</label>
              <input
                value={form.checkOut}
                onChange={(e) => setForm((f) => ({ ...f, checkOut: e.target.value }))}
                placeholder="07:00 PM"
                className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as ReqType }))}
                className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option>Late Arrival</option>
                <option>Early Leave</option>
                <option>Leave</option>
                <option>Missed Punch</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium">Reason</label>
            <textarea
              value={form.reason}
              onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
              rows={4}
              placeholder="Explain the reason for the request…"
              className="mt-1 w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
            />
          </div>
        </div>
      </Drawer>
    </SuperPage>
  );
}
