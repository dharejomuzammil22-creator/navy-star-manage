import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SuperPage } from "@/components/SuperPage";
import { SectionCard } from "@/components/ui-bits";
import { slots as seedSlots } from "@/lib/mock-data";
import { CalendarClock, Plus, Filter, Printer, Monitor, Pencil, X } from "lucide-react";
import { Drawer } from "@/components/Drawer";

export const Route = createFileRoute("/super-admin/slots")({
  component: SlotsPage,
});

type Row = {
  id: string;
  schedule: string;
  trainer: string;
  course: string;
  campus: string;
  seatsUsed: number;
  seatsTotal: number;
  facility: "Lab" | "Class";
  gender: "Male" | "Female";
  status: "ACTIVE" | "INACTIVE";
  online: "YES" | "NO";
  start: string;
  end: string;
  cert: "FREE" | "PAID";
  open: boolean;
};

const FACILITIES: Row["facility"][] = ["Lab", "Class"];
const GENDERS: Row["gender"][] = ["Male", "Female"];
const CERTS: Row["cert"][] = ["FREE", "PAID"];

function seed(): Row[] {
  const schedules = [
    "Sat 11:00 PM - 01:00 AM",
    "Sat 09:00 AM - 11:00 AM",
    "Mon 09:00 AM - 11:00 AM",
    "Mon 11:00 AM - 01:00 PM",
    "Wed 02:00 PM - 04:00 PM",
    "Tue 09:00 AM - 11:00 AM",
    "Fri 04:00 PM - 06:00 PM",
  ];
  return seedSlots.map((s, i) => ({
    id: s.id,
    schedule: schedules[i % schedules.length],
    trainer: s.trainer,
    course: `${s.course} | Batch (${(i % 3) + 1})`,
    campus: s.campus,
    seatsUsed: s.seatsUsed,
    seatsTotal: s.seatsTotal,
    facility: FACILITIES[i % 2],
    gender: GENDERS[i % 2],
    status: s.open ? "ACTIVE" : "INACTIVE",
    online: i % 4 === 0 ? "YES" : "NO",
    start: "01 Aug 2026",
    end: i % 3 === 0 ? "-" : "01 Dec 2026",
    cert: CERTS[i % 2],
    open: s.open,
  }));
}

function emptyRow(): Row {
  return {
    id: `SL-${Math.floor(Math.random() * 900) + 100}`,
    schedule: "Mon 09:00 AM - 11:00 AM",
    trainer: "",
    course: "",
    campus: "",
    seatsUsed: 0,
    seatsTotal: 50,
    facility: "Lab",
    gender: "Male",
    status: "ACTIVE",
    online: "NO",
    start: "01 Aug 2026",
    end: "-",
    cert: "FREE",
    open: true,
  };
}

function SlotsPage() {
  const [rows, setRows] = useState<Row[]>(seed());
  const [showFilters, setShowFilters] = useState(false);
  const [fCampus, setFCampus] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fGender, setFGender] = useState("");
  const [fFacility, setFFacility] = useState("");
  const [drawer, setDrawer] = useState<{ mode: "add" | "edit"; row: Row } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const campuses = useMemo(() => Array.from(new Set(rows.map((r) => r.campus))), [rows]);
  const filtered = rows.filter(
    (r) =>
      (!fCampus || r.campus === fCampus) &&
      (!fStatus || r.status === fStatus) &&
      (!fGender || r.gender === fGender) &&
      (!fFacility || r.facility === fFacility),
  );

  const save = () => {
    if (!drawer) return;
    const r = drawer.row;
    if (!r.trainer.trim() || !r.course.trim()) {
      setMsg("Trainer and Course are required.");
      return;
    }
    if (drawer.mode === "add") {
      setRows((p) => [r, ...p]);
      setMsg(`Slot ${r.id} added.`);
    } else {
      setRows((p) => p.map((x) => (x.id === r.id ? r : x)));
      setMsg(`Slot ${r.id} updated.`);
    }
    setDrawer(null);
  };

  return (
    <SuperPage
      title="Slots"
      subtitle={`${filtered.length} slots scheduled across campuses`}
      stats={[
        { label: "Total Slots", value: rows.length, icon: <CalendarClock className="h-5 w-5" /> },
        { label: "Active", value: rows.filter((r) => r.status === "ACTIVE").length, tone: "success" },
        { label: "Inactive", value: rows.filter((r) => r.status === "INACTIVE").length },
        { label: "Seats Used", value: rows.reduce((a, s) => a + s.seatsUsed, 0), tone: "gold" },
      ]}
    >
      {msg && (
        <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success flex items-center justify-between">
          <span>{msg}</span>
          <button onClick={() => setMsg(null)}><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      <SectionCard title="All Slots">
        <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
          <button
            onClick={() => window.print()}
            className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-accent"
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
          <button
            onClick={() => setDrawer({ mode: "add", row: emptyRow() })}
            className="h-9 inline-flex items-center gap-1.5 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
          >
            Add new <Plus className="h-4 w-4" />
          </button>
        </div>

        {showFilters && (
          <div className="mb-4 rounded-md border border-border bg-muted/30 p-3 grid grid-cols-2 md:grid-cols-5 gap-3">
            <Select label="Campus" value={fCampus} onChange={setFCampus} options={["", ...campuses]} />
            <Select label="Status" value={fStatus} onChange={setFStatus} options={["", "ACTIVE", "INACTIVE"]} />
            <Select label="Gender" value={fGender} onChange={setFGender} options={["", "Male", "Female"]} />
            <Select label="Facility" value={fFacility} onChange={setFFacility} options={["", "Lab", "Class"]} />
            <button
              onClick={() => { setFCampus(""); setFStatus(""); setFGender(""); setFFacility(""); }}
              className="self-end h-9 rounded-md border border-border text-sm hover:bg-accent"
            >
              Clear
            </button>
          </div>
        )}

        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                {["Schedule","Trainer","Course","Campus","Seats","Facility","Gender","Status","Online","Start","End","Cert.","Action"].map((c) => (
                  <th key={c} className="text-left font-semibold px-3 py-3 whitespace-nowrap">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border hover:bg-muted/40 align-top">
                  <td className="px-3 py-4 whitespace-nowrap">{r.schedule}</td>
                  <td className="px-3 py-4 font-medium">{r.trainer}</td>
                  <td className="px-3 py-4 max-w-[200px]">{r.course}</td>
                  <td className="px-3 py-4 max-w-[160px]">{r.campus}</td>
                  <td className="px-3 py-4 tabular-nums">{r.seatsUsed}/{r.seatsTotal}</td>
                  <td className="px-3 py-4"><span className="inline-flex items-center gap-1 text-muted-foreground"><Monitor className="h-3.5 w-3.5" />{r.facility}</span></td>
                  <td className="px-3 py-4">{r.gender}</td>
                  <td className="px-3 py-4"><Chip tone={r.status === "ACTIVE" ? "green" : "gray"}>{r.status}</Chip></td>
                  <td className="px-3 py-4"><Chip tone={r.online === "YES" ? "green" : "amber"}>{r.online}</Chip></td>
                  <td className="px-3 py-4 whitespace-nowrap">{r.start}</td>
                  <td className="px-3 py-4 whitespace-nowrap">{r.end}</td>
                  <td className="px-3 py-4"><Chip tone="amber">{r.cert}</Chip></td>
                  <td className="px-3 py-4">
                    <button
                      onClick={() => setDrawer({ mode: "edit", row: { ...r } })}
                      className="h-8 w-8 grid place-items-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={13} className="px-4 py-10 text-center text-muted-foreground">No slots match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Drawer
        open={!!drawer}
        onClose={() => setDrawer(null)}
        title={drawer?.mode === "edit" ? `Edit ${drawer.row.id}` : "Add Slot"}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setDrawer(null)} className="h-9 px-4 rounded-md border border-border text-sm">Cancel</button>
            <button onClick={save} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm">{drawer?.mode === "edit" ? "Update" : "Save"}</button>
          </div>
        }
      >
        {drawer && (
          <div className="grid grid-cols-2 gap-3">
            <F label="Slot ID"><input className="inp" value={drawer.row.id} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, id: e.target.value } })} /></F>
            <F label="Schedule"><input className="inp" value={drawer.row.schedule} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, schedule: e.target.value } })} /></F>
            <F label="Trainer"><input className="inp" value={drawer.row.trainer} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, trainer: e.target.value } })} /></F>
            <F label="Course"><input className="inp" value={drawer.row.course} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, course: e.target.value } })} /></F>
            <F label="Campus"><input className="inp" value={drawer.row.campus} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, campus: e.target.value } })} /></F>
            <F label="Facility">
              <select className="inp" value={drawer.row.facility} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, facility: e.target.value as Row["facility"] } })}>
                {FACILITIES.map((x) => <option key={x}>{x}</option>)}
              </select>
            </F>
            <F label="Gender">
              <select className="inp" value={drawer.row.gender} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, gender: e.target.value as Row["gender"] } })}>
                {GENDERS.map((x) => <option key={x}>{x}</option>)}
              </select>
            </F>
            <F label="Status">
              <select className="inp" value={drawer.row.status} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, status: e.target.value as Row["status"] } })}>
                <option>ACTIVE</option><option>INACTIVE</option>
              </select>
            </F>
            <F label="Online">
              <select className="inp" value={drawer.row.online} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, online: e.target.value as Row["online"] } })}>
                <option>NO</option><option>YES</option>
              </select>
            </F>
            <F label="Certificate">
              <select className="inp" value={drawer.row.cert} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, cert: e.target.value as Row["cert"] } })}>
                {CERTS.map((x) => <option key={x}>{x}</option>)}
              </select>
            </F>
            <F label="Seats Used"><input type="number" className="inp" value={drawer.row.seatsUsed} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, seatsUsed: +e.target.value } })} /></F>
            <F label="Seats Total"><input type="number" className="inp" value={drawer.row.seatsTotal} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, seatsTotal: +e.target.value } })} /></F>
            <F label="Start"><input className="inp" value={drawer.row.start} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, start: e.target.value } })} /></F>
            <F label="End"><input className="inp" value={drawer.row.end} onChange={(e) => setDrawer({ ...drawer, row: { ...drawer.row, end: e.target.value } })} /></F>
          </div>
        )}
      </Drawer>

      <style>{`.inp{width:100%;height:36px;padding:0 10px;border-radius:6px;border:1px solid hsl(var(--border));background:hsl(var(--background));font-size:14px}`}</style>
    </SuperPage>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full h-9 px-2 rounded-md border border-input bg-background text-sm">
        {options.map((o) => <option key={o} value={o}>{o || `All ${label.toLowerCase()}`}</option>)}
      </select>
    </label>
  );
}

function Chip({ children, tone }: { children: React.ReactNode; tone: "green" | "amber" | "gray" }) {
  const map = {
    green: "border-success/40 text-success bg-success/10",
    amber: "border-gold/50 text-gold bg-gold/10",
    gray: "border-border text-muted-foreground bg-muted/40",
  };
  return <span className={`inline-flex items-center rounded border text-[11px] px-2 py-0.5 font-medium ${map[tone]}`}>{children}</span>;
}
