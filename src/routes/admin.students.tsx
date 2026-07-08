import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, StatusBadge } from "@/components/ui-bits";
import { students } from "@/lib/mock-data";
import { Filter, Download, Plus, Eye, Pencil, Wallet, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/admin/students")({
  component: StudentsPage,
});

function StudentsPage() {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <>
      <PageHeader
        title="Students"
        subtitle={`${students.length.toLocaleString()} students · all campuses`}
        actions={
          <>
            <button
              onClick={() => setMessage("Filters panel opened in demo mode.")}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              <Filter className="h-4 w-4" /> Filters
            </button>
            <button
              onClick={() => setMessage("Students export prepared.")}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent"
            >
              <Download className="h-4 w-4" /> Export
            </button>
            <button
              onClick={() => setMessage("Student registration form opened in demo mode.")}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" /> Register Student
            </button>
          </>
        }
      />
      {message && <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">{message}</div>}

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
              {students.map((s) => (
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
                      <button onClick={() => setMessage(`Viewing ${s.name}.`)} className="h-7 w-7 grid place-items-center rounded hover:bg-accent" title="View"><Eye className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setMessage(`Editing ${s.name}.`)} className="h-7 w-7 grid place-items-center rounded hover:bg-accent" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setMessage(`Payments opened for ${s.name}.`)} className="h-7 w-7 grid place-items-center rounded hover:bg-accent" title="Payments"><Wallet className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setMessage(`More actions opened for ${s.name}.`)} className="h-7 w-7 grid place-items-center rounded hover:bg-accent" aria-label={`More actions for ${s.name}`}><MoreHorizontal className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div>Showing 1–{students.length} of {students.length}</div>
          <div className="flex items-center gap-1">
            <button onClick={() => setMessage("Already on first page.")} className="h-7 px-2 rounded border border-border hover:bg-accent">Prev</button>
            <button onClick={() => setMessage("Page 1 selected.")} className="h-7 px-2 rounded border border-border bg-primary text-primary-foreground">1</button>
            <button onClick={() => setMessage("Page 2 selected.")} className="h-7 px-2 rounded border border-border hover:bg-accent">2</button>
            <button onClick={() => setMessage("Next page selected.")} className="h-7 px-2 rounded border border-border hover:bg-accent">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}
