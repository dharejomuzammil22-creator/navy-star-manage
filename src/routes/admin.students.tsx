import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, StatusBadge } from "@/components/ui-bits";
import { Drawer } from "@/components/Drawer";
import { students as seedStudents, type Student } from "@/lib/mock-data";
import { Filter, Download, Plus, Eye, Pencil, Wallet, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/students")({
  component: StudentsPage,
});

const COURSES = ["Artificial Intelligence", "Web & Mobile App", "Graphic Design", "Cloud Computing", "Cyber Security", "Data Science", "Digital Marketing", "UI/UX Design"];
const CAMPUSES = ["Karachi Main", "Lahore Gulberg", "Islamabad F-8", "Sukkur", "Faisalabad", "Multan", "Peshawar", "Hyderabad"];

const emptyForm = {
  name: "",
  fatherName: "",
  cnic: "",
  phone: "",
  course: COURSES[0],
  campus: CAMPUSES[0],
  gender: "Male" as "Male" | "Female",
};

function StudentsPage() {
  const [list, setList] = useState<Student[]>(seedStudents);
  const [message, setMessage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [viewing, setViewing] = useState<Student | null>(null);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState<Student | null>(null);

  const flash = (m: string) => {
    setMessage(m);
    window.setTimeout(() => setMessage(null), 2500);
  };

  const filtered = list.filter((s) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.roll.toLowerCase().includes(q) ||
      s.cnic.toLowerCase().includes(q) ||
      s.course.toLowerCase().includes(q)
    );
  });

  const handleAdd = () => {
    if (!form.name.trim() || !form.cnic.trim()) {
      flash("Name and CNIC are required.");
      return;
    }
    const nextId = `S${1000 + list.length + Math.floor(Math.random() * 900)}`;
    const newStudent: Student = {
      id: nextId,
      roll: `TIT-2026-${nextId.slice(1)}`,
      name: form.name.trim(),
      fatherName: form.fatherName.trim() || "—",
      cnic: form.cnic.trim(),
      phone: form.phone.trim() || "—",
      course: form.course,
      campus: form.campus,
      batch: 1,
      status: "enrolled",
      payment: "Not Generated",
      gender: form.gender,
    };
    setList((prev) => [newStudent, ...prev]);
    setAddOpen(false);
    setForm(emptyForm);
    flash(`Student ${newStudent.name} registered.`);
  };

  const handleDelete = (s: Student) => {
    if (!window.confirm(`Delete ${s.name}? This cannot be undone.`)) return;
    setList((prev) => prev.filter((x) => x.id !== s.id));
    flash(`Deleted ${s.name}.`);
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    setList((prev) => prev.map((s) => (s.id === editForm.id ? editForm : s)));
    setEditing(null);
    setEditForm(null);
    flash("Student updated.");
  };

  const exportCsv = () => {
    const rows = [
      ["Roll", "Name", "Father", "CNIC", "Phone", "Course", "Campus", "Status", "Payment"],
      ...list.map((s) => [s.roll, s.name, s.fatherName, s.cnic, s.phone, s.course, s.campus, s.status, s.payment]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
    flash("Exported students.csv");
  };

  return (
    <>
      <PageHeader
        title="Students"
        subtitle={`${list.length.toLocaleString()} students · all campuses`}
        actions={
          <>
            <button
              onClick={() => flash("Filter shortcuts: type in search to filter by name, roll, CNIC, or course.")}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              <Filter className="h-4 w-4" /> Filters
            </button>
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              <Download className="h-4 w-4" /> Export
            </button>
            <button
              onClick={() => setAddOpen(true)}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" /> Register Student
            </button>
          </>
        }
      />
      {message && <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">{message}</div>}

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, roll, CNIC or course…"
          className="w-full sm:w-96 h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-4 py-3">Roll #</th>
                <th className="text-left font-medium px-4 py-3">Name</th>
                <th className="text-left font-medium px-4 py-3">Father</th>
                <th className="text-left font-medium px-4 py-3">CNIC</th>
                <th className="text-left font-medium px-4 py-3">Phone</th>
                <th className="text-left font-medium px-4 py-3">Course</th>
                <th className="text-left font-medium px-4 py-3">Campus</th>
                <th className="text-left font-medium px-4 py-3">Status</th>
                <th className="text-left font-medium px-4 py-3">Payment</th>
                <th className="text-right font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-t border-border hover:bg-muted/40">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.roll}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-primary/10 text-primary grid place-items-center text-[10px] font-semibold">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-foreground font-medium">{s.name}</div>
                        <div className="text-[11px] text-muted-foreground">{s.gender} · Batch {s.batch}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.fatherName}</td>
                  <td className="px-4 py-3 font-mono text-xs">{s.cnic}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.phone}</td>
                  <td className="px-4 py-3">{s.course}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.campus}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3"><StatusBadge status={s.payment} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setViewing(s)} className="h-7 w-7 grid place-items-center rounded hover:bg-accent" title="View"><Eye className="h-3.5 w-3.5" /></button>
                      <button onClick={() => { setEditing(s); setEditForm(s); }} className="h-7 w-7 grid place-items-center rounded hover:bg-accent" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                      <button onClick={() => flash(`Payments opened for ${s.name}.`)} className="h-7 w-7 grid place-items-center rounded hover:bg-accent" title="Payments"><Wallet className="h-3.5 w-3.5" /></button>
                      <button onClick={() => handleDelete(s)} className="h-7 w-7 grid place-items-center rounded hover:bg-destructive/10 text-destructive" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-8 text-center text-sm text-muted-foreground">No students match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
          Showing {filtered.length} of {list.length}
        </div>
      </div>

      {/* Add Drawer */}
      <Drawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Register Student"
        subtitle="Add a new student record"
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setAddOpen(false)} className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent">Cancel</button>
            <button onClick={handleAdd} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">Register</button>
          </div>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} colSpan />
          <Field label="Father's Name" value={form.fatherName} onChange={(v) => setForm({ ...form, fatherName: v })} />
          <Field label="CNIC" value={form.cnic} onChange={(v) => setForm({ ...form, cnic: v })} />
          <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <Select label="Gender" value={form.gender} options={["Male", "Female"]} onChange={(v) => setForm({ ...form, gender: v as "Male" | "Female" })} />
          <Select label="Course" value={form.course} options={COURSES} onChange={(v) => setForm({ ...form, course: v })} colSpan />
          <Select label="Campus" value={form.campus} options={CAMPUSES} onChange={(v) => setForm({ ...form, campus: v })} colSpan />
        </div>
      </Drawer>

      {/* View Drawer */}
      <Drawer open={!!viewing} onClose={() => setViewing(null)} title="Student Details" subtitle={viewing?.roll}>
        {viewing && (
          <div className="space-y-3 text-sm">
            {Object.entries({
              Name: viewing.name,
              Father: viewing.fatherName,
              CNIC: viewing.cnic,
              Phone: viewing.phone,
              Course: viewing.course,
              Campus: viewing.campus,
              Gender: viewing.gender,
              Batch: viewing.batch,
              Status: viewing.status,
              Payment: viewing.payment,
            }).map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">{k}</span>
                <span className="font-medium">{String(v)}</span>
              </div>
            ))}
          </div>
        )}
      </Drawer>

      {/* Edit Drawer */}
      <Drawer
        open={!!editing}
        onClose={() => { setEditing(null); setEditForm(null); }}
        title="Edit Student"
        subtitle={editing?.roll}
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
            <Field label="Father's Name" value={editForm.fatherName} onChange={(v) => setEditForm({ ...editForm, fatherName: v })} />
            <Field label="CNIC" value={editForm.cnic} onChange={(v) => setEditForm({ ...editForm, cnic: v })} />
            <Field label="Phone" value={editForm.phone} onChange={(v) => setEditForm({ ...editForm, phone: v })} />
            <Select label="Course" value={editForm.course} options={COURSES} onChange={(v) => setEditForm({ ...editForm, course: v })} />
            <Select label="Campus" value={editForm.campus} options={CAMPUSES} onChange={(v) => setEditForm({ ...editForm, campus: v })} />
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
