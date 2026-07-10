import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-bits";
import { Drawer } from "@/components/Drawer";
import { trainers as seedTrainers } from "@/lib/mock-data";
import { Plus, Mail, Phone, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/trainers")({
  component: TrainersPage,
});

type Trainer = (typeof seedTrainers)[number];

const COURSES = ["Artificial Intelligence", "Web & Mobile App", "Graphic Design", "Cloud Computing", "Cyber Security", "Data Science", "Digital Marketing", "UI/UX Design"];
const CAMPUSES = ["Karachi Main", "Lahore Gulberg", "Islamabad F-8", "Sukkur", "Faisalabad", "Multan", "Peshawar", "Hyderabad"];

const empty = {
  name: "",
  email: "",
  phone: "",
  campus: CAMPUSES[0],
  course: COURSES[0],
};

function TrainersPage() {
  const [list, setList] = useState<Trainer[]>(seedTrainers as Trainer[]);
  const [message, setMessage] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<Trainer | null>(null);
  const [form, setForm] = useState(empty);
  const [editForm, setEditForm] = useState<Trainer | null>(null);

  const flash = (m: string) => {
    setMessage(m);
    window.setTimeout(() => setMessage(null), 2500);
  };

  const handleAdd = () => {
    if (!form.name.trim() || !form.email.trim()) {
      flash("Name and email are required.");
      return;
    }
    const id = `EMP-${200 + list.length + Math.floor(Math.random() * 500)}`;
    const t: Trainer = {
      id,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || "—",
      campus: form.campus,
      courses: [form.course],
    };
    setList((p) => [t, ...p]);
    setAddOpen(false);
    setForm(empty);
    flash(`Trainer ${t.name} added.`);
  };

  const handleDelete = (t: Trainer) => {
    if (!window.confirm(`Remove trainer ${t.name}?`)) return;
    setList((p) => p.filter((x) => x.id !== t.id));
    flash(`Removed ${t.name}.`);
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    setList((p) => p.map((t) => (t.id === editForm.id ? editForm : t)));
    setEditing(null);
    setEditForm(null);
    flash("Trainer updated.");
  };

  return (
    <>
      <PageHeader
        title="Trainers"
        subtitle={`${list.length} trainers · across all campuses`}
        actions={
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm"
          >
            <Plus className="h-4 w-4" /> Add Trainer
          </button>
        }
      />
      {message && <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">{message}</div>}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((t) => (
          <div key={t.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground grid place-items-center font-semibold">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium truncate">{t.name}</div>
                <div className="text-xs font-mono text-muted-foreground">{t.id}</div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => { setEditing(t); setEditForm(t); }} className="h-7 w-7 grid place-items-center rounded hover:bg-accent" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(t)} className="h-7 w-7 grid place-items-center rounded hover:bg-destructive/10 text-destructive" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="mt-4 space-y-1.5 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-3.5 w-3.5" /> {t.email}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-3.5 w-3.5" /> {t.phone}</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {t.courses.map((c) => (
                <span key={c} className="rounded-full bg-primary/10 text-primary text-[10px] font-medium px-2 py-0.5">
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-3 text-xs text-muted-foreground">{t.campus}</div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No trainers yet. Click “Add Trainer” to create one.
          </div>
        )}
      </div>

      <Drawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Trainer"
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setAddOpen(false)} className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent">Cancel</button>
            <button onClick={handleAdd} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">Add</button>
          </div>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} colSpan />
          <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <Select label="Campus" value={form.campus} options={CAMPUSES} onChange={(v) => setForm({ ...form, campus: v })} />
          <Select label="Course" value={form.course} options={COURSES} onChange={(v) => setForm({ ...form, course: v })} />
        </div>
      </Drawer>

      <Drawer
        open={!!editing}
        onClose={() => { setEditing(null); setEditForm(null); }}
        title="Edit Trainer"
        subtitle={editing?.id}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => { setEditing(null); setEditForm(null); }} className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent">Cancel</button>
            <button onClick={handleSaveEdit} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">Save</button>
          </div>
        }
      >
        {editForm && (
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" value={editForm.name} onChange={(v) => setEditForm({ ...editForm, name: v })} colSpan />
            <Field label="Email" value={editForm.email} onChange={(v) => setEditForm({ ...editForm, email: v })} />
            <Field label="Phone" value={editForm.phone} onChange={(v) => setEditForm({ ...editForm, phone: v })} />
            <Select label="Campus" value={editForm.campus} options={CAMPUSES} onChange={(v) => setEditForm({ ...editForm, campus: v })} colSpan />
          </div>
        )}
      </Drawer>
    </>
  );
}

function Field({ label, value, onChange, colSpan }: { label: string; value: string; onChange: (v: string) => void; colSpan?: boolean }) {
  return (
    <label className={`block ${colSpan ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
      />
    </label>
  );
}

function Select({ label, value, options, onChange, colSpan }: { label: string; value: string; options: string[]; onChange: (v: string) => void; colSpan?: boolean }) {
  return (
    <label className={`block ${colSpan ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
