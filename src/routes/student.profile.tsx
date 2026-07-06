import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/ui-bits";

export const Route = createFileRoute("/student/profile")({
  component: () => (
    <>
      <PageHeader title="My Profile" subtitle="Your personal information and enrolled courses." />
      <div className="grid lg:grid-cols-3 gap-6">
        <SectionCard title="Personal">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center font-semibold">HR</div>
            <div>
              <div className="font-medium">Hassan Raza</div>
              <div className="text-xs text-muted-foreground">Male · Age 21</div>
            </div>
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">CNIC</span><span className="font-mono">42101-1234567-8</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Father</span><span>Ali Raza</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Roll #</span><span className="font-mono">TIT-2026-1023</span></div>
          </div>
        </SectionCard>
        <SectionCard title="Contact">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>hassan.raza@titan.edu.pk</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span>+92 321 4567890</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">City</span><span>Karachi</span></div>
            <div className="text-muted-foreground">Address: House 42, Block 5, Gulshan-e-Iqbal, Karachi.</div>
          </div>
        </SectionCard>
        <SectionCard title="Enrolled Courses">
          <ul className="space-y-3 text-sm">
            <li className="rounded-lg border border-border p-3">
              <div className="font-medium">Web & Mobile App</div>
              <div className="text-xs text-muted-foreground">Batch 3 · Karachi Main · Active</div>
            </li>
            <li className="rounded-lg border border-border p-3">
              <div className="font-medium">UI/UX Design</div>
              <div className="text-xs text-muted-foreground">Batch 1 · Karachi Main · Completed</div>
            </li>
          </ul>
        </SectionCard>
      </div>
    </>
  ),
});
