import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui-bits";
import { Drawer } from "@/components/Drawer";
import { trainers as allTrainers } from "@/lib/mock-data";
import {
  Search,
  Download,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Upload,
  RefreshCw,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Mail,
  Phone,
  Filter,
} from "lucide-react";

export const Route = createFileRoute("/super-admin/trainers")({
  component: TrainersPage,
});

type Trainer = (typeof allTrainers)[number];

function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function TrainersPage() {
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<Trainer | null>(null);
  const [edit, setEdit] = useState<Trainer | null>(null);
  const [add, setAdd] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [fCampus, setFCampus] = useState("");
  const [fCourse, setFCourse] = useState("");

  const campuses = useMemo(() => Array.from(new Set(allTrainers.map((t) => t.campus))), []);
  const courseList = useMemo(() => Array.from(new Set(allTrainers.flatMap((t) => t.courses))), []);

  const filtered = useMemo(
    () =>
      allTrainers.filter(
        (t) =>
          (!query ||
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.email.toLowerCase().includes(query.toLowerCase())) &&
          (!fCampus || t.campus === fCampus) &&
          (!fCourse || t.courses.includes(fCourse)),
      ),
    [query, fCampus, fCourse],
  );

  const handleDelete = (t: Trainer) => {
    if (confirm(`Delete trainer ${t.name}?`)) alert("Deleted (demo).");
  };

  const exportCsv = () => {
    const csv = [
      "Employee ID,Name,Email,Phone,Campus,Courses",
      ...filtered.map((t) => `${t.id},${t.name},${t.email},${t.phone},${t.campus},"${t.courses.join(" | ")}"`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trainers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader
        title="Trainers"
        subtitle={`${filtered.length} trainers · all campuses`}
        actions={
          <>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trainer…"
                className="h-9 w-64 pl-9 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
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
              onClick={() => setAdd(true)}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" /> Add Trainer
            </button>
          </>
        }
      />

      {showFilters && (
        <div className="mb-4 rounded-md border border-border bg-muted/30 p-3 flex flex-wrap items-end gap-3">
          <label className="block">
            <span className="text-xs text-muted-foreground">Campus</span>
            <select value={fCampus} onChange={(e) => setFCampus(e.target.value)} className="mt-1 h-9 px-2 rounded-md border border-input bg-background text-sm">
              <option value="">All campuses</option>
              {campuses.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-muted-foreground">Course</span>
            <select value={fCourse} onChange={(e) => setFCourse(e.target.value)} className="mt-1 h-9 px-2 rounded-md border border-input bg-background text-sm">
              <option value="">All courses</option>
              {courseList.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <button
            onClick={() => { setFCampus(""); setFCourse(""); setQuery(""); }}
            className="ml-auto h-9 px-3 rounded-md border border-border text-sm hover:bg-accent"
          >
            Clear
          </button>
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div key={t.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground grid place-items-center text-sm font-semibold">
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-base text-foreground truncate">{t.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{t.id}</div>
                <div className="mt-1 text-xs text-muted-foreground truncate flex items-center gap-1">
                  <Mail className="h-3 w-3" /> {t.email}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {t.phone}
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {t.courses.map((c) => (
                <span key={c} className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary rounded-full px-2 py-0.5">
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-1">
              <button
                onClick={() => setDetail(t)}
                className="flex-1 h-8 rounded border border-border text-xs hover:bg-accent inline-flex items-center justify-center gap-1"
              >
                <Eye className="h-3.5 w-3.5" /> View
              </button>
              <button
                onClick={() => setEdit(t)}
                className="flex-1 h-8 rounded border border-border text-xs hover:bg-accent inline-flex items-center justify-center gap-1"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                onClick={() => handleDelete(t)}
                className="h-8 w-8 rounded border border-border grid place-items-center hover:bg-accent text-destructive"
                title="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Drawer
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail?.name || ""}
        subtitle={detail?.id}
      >
        {detail && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border divide-y divide-border text-sm">
              {[
                ["Email", detail.email],
                ["Phone", detail.phone],
                ["Campus", detail.campus],
                ["Courses", detail.courses.join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium text-foreground text-right">{v}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Social</div>
              <div className="flex gap-2">
                {[Linkedin, Twitter, Github, Globe].map((I, i) => (
                  <a key={i} href="#" className="h-9 w-9 rounded-md border border-border grid place-items-center hover:bg-accent">
                    <I className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <Drawer
        open={add || !!edit}
        onClose={() => {
          setAdd(false);
          setEdit(null);
        }}
        title={edit ? "Edit Trainer" : "Add Trainer"}
        subtitle={edit?.id}
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setAdd(false);
                setEdit(null);
              }}
              className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert(edit ? "Trainer updated (demo)." : "Trainer added (demo).");
                setAdd(false);
                setEdit(null);
              }}
              className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              {edit ? "Update" : "Save"}
            </button>
          </div>
        }
      >
        <TrainerForm initial={edit || undefined} />
      </Drawer>
    </>
  );
}

function TrainerForm({ initial }: { initial?: Trainer }) {
  const [password, setPassword] = useState("");
  return (
    <form className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-muted grid place-items-center text-muted-foreground">
          <Upload className="h-6 w-6" />
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
        >
          <Upload className="h-4 w-4" /> Upload Image
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TField label="Full Name" defaultValue={initial?.name} />
        <TField label="Employee ID" defaultValue={initial?.id} />
        <TField label="Email" defaultValue={initial?.email} />
        <TField label="Phone" defaultValue={initial?.phone} />
        <TField label="Campus" defaultValue={initial?.campus} />
        <TField label="Primary Course" defaultValue={initial?.courses[0]} />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Password
        </label>
        <div className="mt-1 flex gap-2">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Auto-generate or type"
            className="flex-1 h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40 font-mono"
          />
          <button
            type="button"
            onClick={() => setPassword(generatePassword())}
            className="inline-flex items-center gap-1 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Generate
          </button>
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Social Links
        </label>
        <div className="mt-1 space-y-2">
          {[
            { icon: Linkedin, label: "LinkedIn URL" },
            { icon: Twitter, label: "Twitter URL" },
            { icon: Github, label: "GitHub URL" },
            { icon: Globe, label: "Website URL" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-md border border-border grid place-items-center bg-muted/40">
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                placeholder={s.label}
                className="flex-1 h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

function TField({ label, defaultValue }: { label: string; defaultValue?: string }) {
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
