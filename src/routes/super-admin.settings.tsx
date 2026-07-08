import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SuperPage } from "@/components/SuperPage";
import { SectionCard } from "@/components/ui-bits";

function Toggle({ label, hint, defaultChecked }: { label: string; hint?: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        {hint && <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>}
      </div>
      <input type="checkbox" defaultChecked={defaultChecked} className="mt-1 h-5 w-5 accent-primary" />
    </label>
  );
}

export const Route = createFileRoute("/super-admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <SuperPage title="Settings" subtitle="Global system configuration">
      {message && <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">{message}</div>}
      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Institute Details">
          <div className="space-y-3">
            {[
              ["Institute Name", "Taj Institute of Technology & Applied Networks"],
              ["Short Code", "TITAN"],
              ["Head Office", "Karachi, Pakistan"],
              ["Currency", "PKR"],
              ["Time Zone", "Asia/Karachi (GMT+5)"],
            ].map(([l, v]) => (
              <label key={l} className="block">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {l}
                </span>
                <input
                  defaultValue={v}
                  className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </label>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Security">
          <Toggle label="Enforce 2-Factor Authentication" hint="Required for all admin roles." defaultChecked />
          <Toggle label="Auto sign-out after 30 min inactivity" defaultChecked />
          <Toggle label="Restrict admin logins to office IP" />
          <Toggle label="Enable audit logging" defaultChecked />
        </SectionCard>

        <SectionCard title="Notifications">
          <Toggle label="Email notifications" defaultChecked />
          <Toggle label="SMS notifications" defaultChecked />
          <Toggle label="Push notifications" />
          <Toggle label="Weekly digest to Super Admins" defaultChecked />
        </SectionCard>

        <SectionCard title="Academic">
          <Toggle label="Allow late attendance edits" />
          <Toggle label="Auto-generate monthly vouchers" defaultChecked />
          <Toggle label="Open registrations year-round" defaultChecked />
          <Toggle label="Publish results automatically" />
        </SectionCard>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button onClick={() => setMessage("Changes cancelled.")} className="h-9 px-3 rounded-md border border-border bg-card text-sm hover:bg-accent">
          Cancel
        </button>
        <button onClick={() => setMessage("Settings saved successfully.")} className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">
          Save Changes
        </button>
      </div>
    </SuperPage>
  );
}
