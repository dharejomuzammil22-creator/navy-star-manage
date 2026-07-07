import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, StatusBadge } from "@/components/ui-bits";
import { Drawer } from "@/components/Drawer";
import { students as allStudents, type Student } from "@/lib/mock-data";
import {
  Filter,
  Download,
  Printer,
  Plus,
  Eye,
  Pencil,
  Trash2,
  FileText,
  Search,
  X,
} from "lucide-react";

export const Route = createFileRoute("/super-admin/students")({
  component: StudentsPage,
});

type FilterState = {
  country: string;
  city: string;
  campus: string;
  course: string;
  batch: string;
  slot: string;
  status: string;
  gender: string;
  laptop: string;
  scholarship: string;
  paymentMonth: string;
  paymentStatus: string;
  from: string;
  to: string;
  year: string;
};

const emptyFilters: FilterState = {
  country: "",
  city: "",
  campus: "",
  course: "",
  batch: "",
  slot: "",
  status: "",
  gender: "",
  laptop: "",
  scholarship: "",
  paymentMonth: "",
  paymentStatus: "",
  from: "",
  to: "",
  year: "",
};

function StudentsPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [detail, setDetail] = useState<Student | null>(null);
  const [edit, setEdit] = useState<Student | null>(null);
  const [register, setRegister] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    return allStudents.filter((s) => {
      if (query) {
        const q = query.toLowerCase();
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.roll.toLowerCase().includes(q) &&
          !s.cnic.includes(q)
        )
          return false;
      }
      if (filters.campus && s.campus !== filters.campus) return false;
      if (filters.course && s.course !== filters.course) return false;
      if (filters.status && s.status !== filters.status) return false;
      if (filters.gender && s.gender !== filters.gender) return false;
      if (filters.paymentStatus && s.payment !== filters.paymentStatus) return false;
      if (filters.batch && String(s.batch) !== filters.batch) return false;
      return true;
    });
  }, [query, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const handleDelete = (s: Student) => {
    if (confirm(`Delete student ${s.name} (${s.roll})?`)) {
      alert("Student deleted (demo).");
    }
  };

  const handleExport = () => {
    const header = "Roll,Name,Father,CNIC,Phone,Course,Campus,Status,Payment";
    const csv = [
      header,
      ...filtered.map(
        (s) =>
          `${s.roll},${s.name},${s.fatherName},${s.cnic},${s.phone},${s.course},${s.campus},${s.status},${s.payment}`,
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  const handleAuditPdf = (s: Student) => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <html><head><title>Audit · ${s.roll}</title>
      <style>body{font-family:Inter,sans-serif;padding:40px;color:#111}
      h1{color:#0b1e3f;border-bottom:2px solid #d4af37;padding-bottom:8px}
      .row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee}</style>
      </head><body>
      <h1>Titan SMS · Student Audit Report</h1>
      <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
      <div class="row"><span>Roll #</span><strong>${s.roll}</strong></div>
      <div class="row"><span>Name</span><strong>${s.name}</strong></div>
      <div class="row"><span>Father</span><strong>${s.fatherName}</strong></div>
      <div class="row"><span>CNIC</span><strong>${s.cnic}</strong></div>
      <div class="row"><span>Phone</span><strong>${s.phone}</strong></div>
      <div class="row"><span>Course</span><strong>${s.course}</strong></div>
      <div class="row"><span>Campus</span><strong>${s.campus}</strong></div>
      <div class="row"><span>Batch</span><strong>${s.batch}</strong></div>
      <div class="row"><span>Status</span><strong>${s.status}</strong></div>
      <div class="row"><span>Payment</span><strong>${s.payment}</strong></div>
      <script>window.onload=()=>window.print()</script>
      </body></html>
    `);
    w.document.close();
  };

  return (
    <>
      <PageHeader
        title="Students"
        subtitle={`${filtered.length.toLocaleString()} of ${allStudents.length.toLocaleString()} shown`}
        actions={
          <>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, roll, CNIC…"
                className="h-9 w-64 pl-9 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="relative inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              <Filter className="h-4 w-4" /> Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 h-5 min-w-5 px-1 rounded-full bg-gold text-primary text-[10px] font-semibold grid place-items-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              <Download className="h-4 w-4" /> Export
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              <Printer className="h-4 w-4" /> Print
            </button>
            <button
              onClick={() => setRegister(true)}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" /> Add Student
            </button>
          </>
        }
      />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-4 py-3">Roll #</th>
                <th className="text-left font-medium px-4 py-3">Name</th>
                <th className="text-left font-medium px-4 py-3">CNIC</th>
                <th className="text-left font-medium px-4 py-3">Course</th>
                <th className="text-left font-medium px-4 py-3">Campus</th>
                <th className="text-left font-medium px-4 py-3">Status</th>
                <th className="text-left font-medium px-4 py-3">Payment</th>
                <th className="text-right font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-t border-border hover:bg-muted/40">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.roll}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-primary/10 text-primary grid place-items-center text-[10px] font-semibold">
                        {s.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="text-foreground font-medium">{s.name}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {s.gender} · Batch {s.batch}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{s.cnic}</td>
                  <td className="px-4 py-3">{s.course}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.campus}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.payment} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setDetail(s)}
                        className="h-7 w-7 grid place-items-center rounded hover:bg-accent"
                        title="View"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setEdit(s)}
                        className="h-7 w-7 grid place-items-center rounded hover:bg-accent"
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleAuditPdf(s)}
                        className="h-7 w-7 grid place-items-center rounded hover:bg-accent"
                        title="Audit PDF"
                      >
                        <FileText className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s)}
                        className="h-7 w-7 grid place-items-center rounded hover:bg-accent text-destructive"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground text-sm">
                    No students match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div>
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of{" "}
            {filtered.length}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-7 px-2 rounded border border-border hover:bg-accent disabled:opacity-40"
              disabled={page === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-7 min-w-7 px-2 rounded border border-border ${
                  page === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-7 px-2 rounded border border-border hover:bg-accent disabled:opacity-40"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Filters drawer */}
      <Drawer
        open={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filter Students"
        subtitle="Refine the list by any combination of attributes."
        footer={
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setFilters(emptyFilters)}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              <X className="h-4 w-4" /> Reset
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(false)}
                className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPage(1);
                  setShowFilters(false);
                }}
                className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
              >
                Apply Filters
              </button>
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <FilterField label="Country">
            <select
              className="filter-input"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            >
              <option value="">Any</option>
              <option>Pakistan</option>
            </select>
          </FilterField>
          <FilterField label="City">
            <select
              className="filter-input"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            >
              <option value="">Any</option>
              {["Karachi", "Lahore", "Islamabad", "Sukkur", "Multan", "Peshawar"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Campus">
            <select
              className="filter-input"
              value={filters.campus}
              onChange={(e) => setFilters({ ...filters, campus: e.target.value })}
            >
              <option value="">Any</option>
              {[
                "Karachi Main",
                "Lahore Gulberg",
                "Islamabad F-8",
                "Sukkur",
                "Faisalabad",
                "Multan",
                "Peshawar",
                "Hyderabad",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Course">
            <select
              className="filter-input"
              value={filters.course}
              onChange={(e) => setFilters({ ...filters, course: e.target.value })}
            >
              <option value="">Any</option>
              {[
                "Artificial Intelligence",
                "Web & Mobile App",
                "Graphic Design",
                "Cloud Computing",
                "Cyber Security",
                "Data Science",
                "Digital Marketing",
                "UI/UX Design",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Batch">
            <select
              className="filter-input"
              value={filters.batch}
              onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5, 6].map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Slot">
            <select
              className="filter-input"
              value={filters.slot}
              onChange={(e) => setFilters({ ...filters, slot: e.target.value })}
            >
              <option value="">Any</option>
              <option>Morning</option>
              <option>Evening</option>
              <option>Weekend</option>
            </select>
          </FilterField>
          <FilterField label="Status">
            <select
              className="filter-input"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Any</option>
              {["pending", "enrolled", "active", "passed", "failed", "completed"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Gender">
            <select
              className="filter-input"
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            >
              <option value="">Any</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </FilterField>
          <FilterField label="Laptop">
            <select
              className="filter-input"
              value={filters.laptop}
              onChange={(e) => setFilters({ ...filters, laptop: e.target.value })}
            >
              <option value="">Any</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </FilterField>
          <FilterField label="Scholarship">
            <select
              className="filter-input"
              value={filters.scholarship}
              onChange={(e) => setFilters({ ...filters, scholarship: e.target.value })}
            >
              <option value="">Any</option>
              <option>Full</option>
              <option>Partial</option>
              <option>None</option>
            </select>
          </FilterField>
          <FilterField label="Payment Month">
            <select
              className="filter-input"
              value={filters.paymentMonth}
              onChange={(e) => setFilters({ ...filters, paymentMonth: e.target.value })}
            >
              <option value="">Any</option>
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                (m) => (
                  <option key={m}>{m}</option>
                ),
              )}
            </select>
          </FilterField>
          <FilterField label="Payment Status">
            <select
              className="filter-input"
              value={filters.paymentStatus}
              onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
            >
              <option value="">Any</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Not Generated</option>
            </select>
          </FilterField>
          <FilterField label="From">
            <input
              type="date"
              className="filter-input"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </FilterField>
          <FilterField label="To">
            <input
              type="date"
              className="filter-input"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </FilterField>
          <FilterField label="Year">
            <select
              className="filter-input"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            >
              <option value="">Any</option>
              {["2024", "2025", "2026"].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </FilterField>
        </div>
      </Drawer>

      {/* Details drawer */}
      <Drawer
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail ? detail.name : ""}
        subtitle={detail ? `${detail.roll} · ${detail.course}` : ""}
        footer={
          detail && (
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleAuditPdf(detail)}
                className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
              >
                <FileText className="h-4 w-4" /> Audit PDF
              </button>
              <button
                onClick={() => {
                  setEdit(detail);
                  setDetail(null);
                }}
                className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
              >
                <Pencil className="h-4 w-4" /> Edit
              </button>
            </div>
          )
        }
      >
        {detail && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center text-lg font-semibold">
                {detail.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="font-display text-lg">{detail.name}</div>
                <div className="text-sm text-muted-foreground">{detail.phone}</div>
                <div className="mt-1 flex gap-2">
                  <StatusBadge status={detail.status} />
                  <StatusBadge status={detail.payment} />
                </div>
              </div>
            </div>
            <DetailRows
              rows={[
                ["Roll #", detail.roll],
                ["Father", detail.fatherName],
                ["CNIC", detail.cnic],
                ["Phone", detail.phone],
                ["Course", detail.course],
                ["Campus", detail.campus],
                ["Batch", `Batch ${detail.batch}`],
                ["Gender", detail.gender],
              ]}
            />
          </div>
        )}
      </Drawer>

      {/* Edit drawer */}
      <Drawer
        open={!!edit}
        onClose={() => setEdit(null)}
        title="Edit Student"
        subtitle={edit ? edit.roll : ""}
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEdit(null)}
              className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert("Student updated (demo).");
                setEdit(null);
              }}
              className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              Update
            </button>
          </div>
        }
      >
        {edit && <StudentForm initial={edit} />}
      </Drawer>

      {/* Register drawer */}
      <Drawer
        open={register}
        onClose={() => setRegister(false)}
        title="Register New Student"
        subtitle="Fill in the student's details."
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setRegister(false)}
              className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert("Student registered (demo).");
                setRegister(false);
              }}
              className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              Save
            </button>
          </div>
        }
      >
        <StudentForm />
      </Drawer>
    </>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <div className="mt-1">{children}</div>
      <style>{`.filter-input{width:100%;height:36px;padding:0 10px;border-radius:6px;border:1px solid hsl(var(--border));background:hsl(var(--background));font-size:14px;outline:none}`}</style>
    </label>
  );
}

function DetailRows({ rows }: { rows: [string, string][] }) {
  return (
    <div className="rounded-lg border border-border divide-y divide-border">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between px-4 py-2.5 text-sm">
          <span className="text-muted-foreground">{k}</span>
          <span className="font-medium text-foreground">{v}</span>
        </div>
      ))}
    </div>
  );
}

function StudentForm({ initial }: { initial?: Student }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Full Name" defaultValue={initial?.name} />
        <FormField label="Father's Name" defaultValue={initial?.fatherName} />
        <FormField label="CNIC" defaultValue={initial?.cnic} />
        <FormField label="Phone" defaultValue={initial?.phone} />
        <FormField label="Course" defaultValue={initial?.course} />
        <FormField label="Campus" defaultValue={initial?.campus} />
        <FormField label="Batch" defaultValue={initial?.batch?.toString()} />
        <FormField label="Gender" defaultValue={initial?.gender} />
      </div>
      <label className="block">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Address
        </span>
        <textarea
          rows={3}
          className="mt-1 w-full rounded-md border border-input bg-background text-sm p-2.5 outline-none focus:ring-2 focus:ring-ring/40"
          placeholder="Full residential address"
        />
      </label>
    </form>
  );
}

function FormField({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <input
        defaultValue={defaultValue}
        className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
      />
    </label>
  );
}
