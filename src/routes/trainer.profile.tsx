import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/ui-bits";
import { Download } from "lucide-react";

export const Route = createFileRoute("/trainer/profile")({
  component: () => (
    <>
      <PageHeader title="My Profile" subtitle="Trainer account and ID card." />
      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard title="Details">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center font-semibold">BA</div>
            <div>
              <div className="font-medium">Bilal Ahmed</div>
              <div className="text-sm text-muted-foreground">trainer@titan.edu.pk</div>
              <div className="text-xs font-mono text-muted-foreground mt-1">EMP-202</div>
            </div>
          </div>
          <div className="mt-5 grid gap-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Campus</span><span>Karachi Main</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span>+92 300 1234567</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Hourly rate</span><span>Rs 2,500</span></div>
          </div>
        </SectionCard>
        <SectionCard title="ID Card">
          <div className="rounded-xl overflow-hidden border border-border" style={{background:"var(--gradient-navy)"}}>
            <div className="p-5 text-sidebar-foreground">
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold">Trainer ID</div>
              <div className="mt-1 font-display text-xl">Bilal Ahmed</div>
              <div className="mt-3 flex gap-4">
                <div className="h-20 w-20 rounded-lg bg-white/20 grid place-items-center text-2xl">BA</div>
                <div className="text-xs space-y-1">
                  <div>EMP-202</div>
                  <div>Karachi Main</div>
                  <div>Web & Mobile App</div>
                </div>
              </div>
              <div className="mt-4 h-10 rounded bg-white grid place-items-center text-[10px] tracking-widest text-primary">
                | ||| | ||| || | |||| | || ||| |
              </div>
            </div>
          </div>
          <button className="mt-4 inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border text-sm hover:bg-accent">
            <Download className="h-4 w-4" /> Download ID Card
          </button>
        </SectionCard>
      </div>
    </>
  ),
});
