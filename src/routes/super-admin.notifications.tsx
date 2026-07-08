import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SuperPage } from "@/components/SuperPage";
import { SectionCard } from "@/components/ui-bits";
import { Bell, Send } from "lucide-react";

const items = [
  { title: "Fee due for July", body: "34 vouchers pending payment.", when: "2h ago", type: "billing" },
  { title: "New registrations", body: "12 new registrations require review.", when: "5h ago", type: "signup" },
  { title: "Trainer onboarding", body: "Fahad Qureshi joined AI department.", when: "yesterday", type: "team" },
  { title: "System backup completed", body: "Nightly backup finished successfully.", when: "yesterday", type: "system" },
  { title: "Attendance below 70%", body: "3 batches flagged for low attendance.", when: "2 days ago", type: "alert" },
];

export const Route = createFileRoute("/super-admin/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <SuperPage
      title="Notifications"
      subtitle="System alerts & broadcasts"
      actions={
        <button
          onClick={() => setMessage("Broadcast composer opened in demo mode.")}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
        >
          <Send className="h-4 w-4" /> Send Broadcast
        </button>
      }
    >
      {message && <div className="mb-4 rounded-md border border-success/30 bg-success/10 px-4 py-2 text-sm text-success">{message}</div>}
      <SectionCard title="Inbox">
        <ul className="divide-y divide-border">
          {items.map((n, i) => (
            <li key={i} className="py-4 flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-foreground">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.when}</div>
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">{n.body}</div>
                <span className="mt-2 inline-block text-[10px] uppercase tracking-wider bg-muted rounded-full px-2 py-0.5">
                  {n.type}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </SuperPage>
  );
}
