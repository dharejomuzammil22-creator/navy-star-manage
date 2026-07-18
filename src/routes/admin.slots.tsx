import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, StatusBadge } from "@/components/ui-bits";
import { Drawer } from "@/components/Drawer";
import { slots as seedSlots } from "@/lib/mock-data";
import { Plus, CalendarClock, Trash2, Pencil } from "lucide-react";

export const Route = createFileRoute("/admin/slots")({
  component: SlotsPage,
});

type Slot = (typeof seedSlots)[number];

const COURSES = ["Artificial Intelligence", "Web & Mobile App", "Graphic Design", "Cloud Computing", "Cyber Security", "Data Science", "Digital Marketing", "UI/UX Design"];
const CAMPUSES = ["Karachi Main", "Lahore Gulberg", "Islamabad F-8", "Sukkur", "Faisalabad", "Multan", "Peshawar", "Hyderabad"];
const SCHEDULES = ["Mon/Wed/Fri 4:00–6:00 PM", "Mon/Wed/Fri 6:00–8:00 PM", "Mon/Wed/Fri 10:00 AM–12:00 PM"];

function emptyForm(): Slot {
  return {
    id: `SL-${Math.floor(Math.random() * 900) + 100}`,
    course: COURSES[0],
    trainer: "",
    campus: CAMPUSES[0],
    schedule: SCHEDULES[0],
    seatsUsed: 0,
    seatsTotal: 60,
    open: true,
  };
}

function SlotsPage() {
  const [list, setList] = useState<Slot[]>([...seedSlots]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Slot | null>(null);
  const [form, setForm] = useState<Slot>(emptyForm());
  const [message, setMessage] = useState<string | null>(null);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  }
  function openEdit(s: Slot) {
    setEditing(s);
    setForm({ ...s });
    setOpen(true);
  }
  function save() {
    if (!form.trainer.trim()) {
      setMessage("Trainer name is required.");
      return;
    }
    if (editing) {
      setList((l) => l.map((x) => (x.id === editing.id ? form : x)));
      setMessage(`Slot ${form.id} updated.`);
    } else {
      setList((l) => [form, ...l]);
      setMessage(`Slot ${form.id} added.`);
    }
    setOpen(false);
  }
  function remove(id: string) {
    if (!confirm("Delete this slot?")) return;
    setList((l) => l.filter((s) => s.id !== id));
    setMessage(`Slot ${id} deleted.`);
  }

  return (
    <>
      <PageHeader
        title="Slots"
        subtitle="Class groups — one course, one trainer, one campus."
        actions={
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm"
          >
            <Plus className="h-4 w-4" /> Add Slot
          </button>
        }
      />
      {message && (
        <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="text-xs opacity-70 hover:opacity-100">dismiss</button>
        </div>
      )}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((s) => {
          const pct = Math.round((s.seatsUsed / s.seatsTotal) * 100);
          return (
            <div key={s.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-muted-foreground">{s.id}</div>
                  <div className="font-display text-lg mt-1">{s.course}</div>
                </div>
                <StatusBadge status={s.open ? "Open" : "Closed"} />
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarClock className="h-4 w-4" /> {s.schedule}
              </div>
              <div className="mt-2 text-sm">
                <div className="text-muted-foreground">Trainer</div>
                <div>{s.trainer}</div>
              </div>
              <div className="mt-2 text-sm">
                <div className="text-muted-foreground">Campus</div>
                <div>{s.campus}</div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Seats</span>
                  <span className="tabular-nums">{s.seatsUsed}/{s.seatsTotal}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => openEdit(s)} className="inline-flex items-center gap-1 h-8 px-3 rounded-md border border-border text-xs hover:bg-muted">
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                <button onClick={() => remove(s.id)} className="inline-flex items-center gap-1 h-8 px-3 rounded-md border border-destructive/40 text-destructive text-xs hover:bg-destructive/10">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? `Edit ${editing.id}` : "Add new slot"}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="h-9 px-4 rounded-md border border-border text-sm">Cancel</button>
            <button onClick={save} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm">Submit</button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-primary">
            Format: Mon 09:00 AM - 11:00 AM | Wed 09:00 AM - 11:00 AM | Fri 09:00 AM - 11:00 AM
          </div>
          <Field label="Schedule">
            <select value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} className="input">
              {SCHEDULES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Select city">
              <select className="input" defaultValue="">
                <option value="" disabled>Select city</option>
                {CAMPUSES.map((c) => <option key={c}>{c.split(" ")[0]}</option>)}
              </select>
            </Field>
            <Field label="Select campus">
              <select value={form.campus} onChange={(e) => setForm({ ...form, campus: e.target.value })} className="input">
                {CAMPUSES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Select course">
            <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className="input">
              {COURSES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Select trainer">
              <input value={form.trainer} onChange={(e) => setForm({ ...form, trainer: e.target.value })} placeholder="e.g. Ahmed Khan" className="input" />
            </Field>
            <Field label="Class type">
              <select className="input" defaultValue="Regular"><option>Regular</option><option>Weekend</option><option>Bootcamp</option></select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Select status">
              <select value={form.open ? "Active" : "Inactive"} onChange={(e) => setForm({ ...form, open: e.target.value === "Active" })} className="input">
                <option>Active</option><option>Inactive</option>
              </select>
            </Field>
            <Field label="Select gender">
              <select className="input" defaultValue="Co-Ed"><option>Co-Ed</option><option>Male</option><option>Female</option></select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start date"><input type="date" className="input" /></Field>
            <Field label="End date"><input type="date" className="input" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Class Type">
              <select className="input" defaultValue="Lab"><option>Lab</option><option>Classroom</option><option>Online</option></select>
            </Field>
            <Field label="Trainer hourly rate">
              <input type="number" placeholder="e.g. 1500" className="input" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Paid / Free">
              <select className="input" defaultValue="Paid"><option>Paid</option><option>Free</option></select>
            </Field>
            <Field label="Whatsapp Group link">
              <input placeholder="https://chat.whatsapp.com/..." className="input" />
            </Field>
          </div>
          <Field label={`Capacity: ${form.seatsTotal}`}>
            <input
              type="range"
              min={10}
              max={120}
              value={form.seatsTotal}
              onChange={(e) => setForm({ ...form, seatsTotal: +e.target.value })}
              className="w-full accent-primary"
            />
          </Field>
        </div>
      </Drawer>

      <style>{`.input{width:100%;height:36px;padding:0 10px;border-radius:6px;border:1px solid hsl(var(--border));background:hsl(var(--background));font-size:14px}`}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      {children}
    </div>
  );
}
