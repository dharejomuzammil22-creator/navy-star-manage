import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-bits";
import { trainers } from "@/lib/mock-data";
import { Plus, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/admin/trainers")({
  component: TrainersPage,
});

function TrainersPage() {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <>
      <PageHeader
        title="Trainers"
        subtitle={`${trainers.length} trainers · across all campuses`}
        actions={
          <button
            onClick={() => setMessage("Add trainer form opened in demo mode.")}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm"
          >
            <Plus className="h-4 w-4" /> Add Trainer
          </button>
        }
      />
      {message && <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">{message}</div>}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {trainers.map((t) => (
          <div key={t.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground grid place-items-center font-semibold">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="min-w-0">
                <div className="font-medium truncate">{t.name}</div>
                <div className="text-xs font-mono text-muted-foreground">{t.id}</div>
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
      </div>
    </>
  );
}
