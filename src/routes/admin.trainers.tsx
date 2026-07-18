import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, SectionCard, StatusBadge } from "@/components/ui-bits";
import { Drawer } from "@/components/Drawer";
import { trainers as seedTrainers } from "@/lib/mock-data";
import { Plus, Filter, Search, Download, Printer, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/trainers")({
  component: TrainersPage,
});

type Trainer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  campus: string;
  courses: string[];
  status: "active" | "inactive";
};

const COURSES = ["Artificial Intelligence", "Web & Mobile App", "Graphic Design", "Cloud Computing", "Cyber Security", "Data Science", "Digital Marketing", "UI/UX Design"];
const CAMPUSES = ["Karachi Main", "Lahore Gulberg", "Islamabad F-8", "Sukkur", "Faisalabad", "Multan", "Peshawar", "Hyderabad"];

const initial: Trainer[] = seedTrainers.map((t, i) => ({ ...t, status: (i % 5 === 0 ? "inactive" : "active") as "active" | "inactive" }));

const emptyForm = () => ({
  name: "",
  email: "",
  phone: "",
  employeeId: "",
  campus: CAMPUSES[0],
  course: COURSES[0],
  status: "active" as "active" | "inactive",
});

function TrainersPage() {
  const [list, setList] = useState<Trainer[]>(initial);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<Trainer | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [q, setQ] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [campusFilter, setCampusFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const flash = (m: string) => { setMsg(m); window.setTimeout(() => setMsg(null), 2500); };

  const filtered = useMemo(() => {
    const n = q.toLowerCase().trim();
    return list.filter((t) => {
      if (campusFilter && t.campus !== campusFilter) return false;
      if (courseFilter && !t.courses.includes(courseFilter)) return false;
      if (!n) return true;
      return t.name.toLowerCase().includes(n) || t.email.toLowerCase().includes(n) || t.id.toLowerCase().includes(n);
    });
  }, [list, q, campusFilter, courseFilter]);

  const submit = () => {
    if (!form.name.trim() || !form.email.trim()) { flash("Name and email required."); return; }
    if (editing) {
      setList((p) => p.map((t) => t.id === editing.id ? {
        ...t, name: form.name, email: form.email, phone: form.phone, campus: form.campus,
        courses: [form.course], status: form.status,
      } : t));
      flash("Trainer updated.");
    } else {
      const id = form.employeeId.trim() || `EMP-${200 + list.length + Math.floor(Math.random() * 500)}`;
      setList((p) => [{
        id, name: form.name, email: form.email, phone: form.phone || "—",
        campus: form.campus, courses: [form.course], status: form.status,
      }, ...p]);
      flash("Trainer added.");
    }
    setAddOpen(false); setEditing(null); setForm(emptyForm());
  };

  const del = (t: Trainer) => {
    if (!window.confirm(`Remove ${t.name}?`)) return;
    setList((p) => p.filter((x) => x.id !== t.id));
    flash(`Removed ${t.name}.`);
  };

  const openEdit = (t: Trainer) => {
    setEditing(t);
    setForm({ name: t.name, email: t.email, phone: t.phone, employeeId: t.id, campus: t.campus, course: t.courses[0] || COURSES[0], status: t.status });
    setAddOpen(true);
  };

  const exportCsv = () => {
    const header = ["Trainer", "Email", "Employee ID", "Courses", "Cities", "Status"];
    const body = filtered.map((t) => [t.name, t.email, t.id, t.courses.join("; "), t.campus, t.status]);
    const csv = [header, ...body].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = "trainers.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader title="Trainers" subtitle={`${list.length} trainers across all campuses`} />
      {msg && <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">{msg}</div>}

      <SectionCard title="Trainer List">
        <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
          <button onClick={() => window.print()} className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-accent" title="Print"><Printer className="h-4 w-4" /></button>
          <button onClick={() => setShowFilters((v) => !v)} className="h-9 inline-flex items-center gap-1.5 px-3 rounded-md border border-border text-sm hover:bg-accent"><Filter className="h-4 w-4" /> Filters</button>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="h-9 pl-8 pr-3 rounded-md border border-input bg-background text-sm outline-none" />
          </div>
          <button onClick={exportCsv} className="h-9 inline-flex items-center gap-1.5 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:opacity-90"><Download className="h-4 w-4" /> Export</button>
          <button onClick={() => { setEditing(null); setForm(emptyForm()); setAddOpen(true); }} className="h-9 inline-flex items-center gap-1.5 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:opacity-90"><Plus className="h-4 w-4" /> Add new</button>
        </div>

        {showFilters && (
          <div className="mb-4 rounded-md border border-border bg-muted/30 p-3 flex flex-wrap items-center gap-3">
            <div className="text-xs text-muted-foreground">Campus</div>
            <select value={campusFilter} onChange={(e) => setCampusFilter(e.target.value)} className="h-8 px-2 rounded-md border border-input bg-background text-sm">
              <option value="">All</option>
              {CAMPUSES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <div className="text-xs text-muted-foreground">Course</div>
            <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="h-8 px-2 rounded-md border border-input bg-background text-sm">
              <option value="">All</option>
              {COURSES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button onClick={() => { setCampusFilter(""); setCourseFilter(""); setQ(""); }} className="ml-auto text-xs text-primary hover:underline">Clear</button>
          </div>
        )}

        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left font-semibold px-4 py-3">Trainer name</th>
                <th className="text-left font-semibold px-4 py-3">Email</th>
                <th className="text-left font-semibold px-4 py-3">Employee ID</th>
                <th className="text-left font-semibold px-4 py-3">Courses</th>
                <th className="text-left font-semibold px-4 py-3">Cities</th>
                <th className="text-left font-semibold px-4 py-3">Status</th>
                <th className="text-left font-semibold px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-border hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium">{t.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.email}</td>
                  <td className="px-4 py-3 font-mono text-xs">{t.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {t.courses.map((c) => <span key={c} className="rounded-full bg-primary/10 text-primary text-[10px] px-2 py-0.5">{c}</span>)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{t.campus}</td>
                  <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(t)} className="h-7 w-7 grid place-items-center rounded hover:bg-accent" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                      <button onClick={() => del(t)} className="h-7 w-7 grid place-items-center rounded hover:bg-destructive/10 text-destructive" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">No data</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Drawer
        open={addOpen}
        onClose={() => { setAddOpen(false); setEditing(null); }}
        title={editing ? `Edit ${editing.name}` : "Add new trainer"}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => { setAddOpen(false); setEditing(null); }} className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent">Cancel</button>
            <button onClick={submit} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">Submit</button>
          </div>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} colSpan />
          <F label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <F label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <F label="Employee ID" value={form.employeeId} onChange={(v) => setForm({ ...form, employeeId: v })} placeholder="Auto if empty" />
          <S label="Campus" value={form.campus} options={CAMPUSES} onChange={(v) => setForm({ ...form, campus: v })} />
          <S label="Course" value={form.course} options={COURSES} onChange={(v) => setForm({ ...form, course: v })} />
          <S label="Status" value={form.status} options={["active", "inactive"]} onChange={(v) => setForm({ ...form, status: v as "active" | "inactive" })} />
        </div>
      </Drawer>
    </>
  );
}

function F({ label, value, onChange, colSpan, placeholder }: { label: string; value: string; onChange: (v: string) => void; colSpan?: boolean; placeholder?: string }) {
  return (
    <label className={`block ${colSpan ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40" />
    </label>
  );
}
function S({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
