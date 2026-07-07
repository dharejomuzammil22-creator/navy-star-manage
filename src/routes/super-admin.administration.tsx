import { createFileRoute } from "@tanstack/react-router";
import { SuperPage } from "@/components/SuperPage";
import { SectionCard } from "@/components/ui-bits";
import { Shield, Users, Building2, KeyRound, ScrollText, Settings } from "lucide-react";

const cards = [
  { icon: Users, title: "Users", desc: "Manage all system users across every role.", count: 187 },
  { icon: KeyRound, title: "Roles & Permissions", desc: "Define access boundaries per role.", count: 6 },
  { icon: Building2, title: "Campuses", desc: "Add, edit and audit campus records.", count: 14 },
  { icon: Shield, title: "Security Policies", desc: "Password rules, 2FA and login limits.", count: 8 },
  { icon: ScrollText, title: "Activity Logs", desc: "Every write action, filterable per user.", count: 24_318 },
  { icon: Settings, title: "System Settings", desc: "Global configuration & preferences.", count: 42 },
];

export const Route = createFileRoute("/super-admin/administration")({
  component: () => (
    <SuperPage
      title="Administration"
      subtitle="High-level controls only Super Admins can see"
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((c) => (
          <SectionCard key={c.title} title={c.title}>
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
                <div className="mt-2 text-2xl font-display font-semibold">
                  {c.count.toLocaleString()}
                </div>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </SuperPage>
  ),
});
