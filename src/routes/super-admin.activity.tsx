import { createFileRoute } from "@tanstack/react-router";
import { SuperPage } from "@/components/SuperPage";
import { SectionCard } from "@/components/ui-bits";
import { ScrollText } from "lucide-react";

const logs = Array.from({ length: 30 }).map((_, i) => ({
  when: `2026-07-0${(i % 9) + 1} ${(9 + (i % 8)).toString().padStart(2, "0")}:${(10 + i).toString().slice(-2)}`,
  user: ["Zaid Rehman", "Ayesha Malik", "Bilal Ahmed", "System"][i % 4],
  action: ["updated", "created", "deleted", "approved", "generated"][i % 5],
  target: ["Student TIT-2026-10" + i, "Voucher V-9012" + i, "Slot SL-10" + i, "Trainer EMP-20" + i][i % 4],
  ip: `10.0.${i % 250}.${(i * 7) % 250}`,
}));

export const Route = createFileRoute("/super-admin/activity")({
  component: () => (
    <SuperPage
      title="Activity Logs"
      subtitle={`${logs.length} recent audit entries`}
      stats={[
        { label: "Today", value: 128, icon: <ScrollText className="h-5 w-5" />, tone: "gold" },
        { label: "This Week", value: 942 },
        { label: "This Month", value: 4_213 },
        { label: "All Time", value: "24.3k" },
      ]}
    >
      <SectionCard title="Recent Activity">
        <ul className="divide-y divide-border">
          {logs.map((l, i) => (
            <li key={i} className="py-3 grid grid-cols-[160px_1fr_120px] items-center gap-3 text-sm">
              <div className="text-xs text-muted-foreground font-mono">{l.when}</div>
              <div>
                <span className="font-medium text-foreground">{l.user}</span>{" "}
                <span className="text-muted-foreground">{l.action}</span>{" "}
                <span className="font-medium text-foreground">{l.target}</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono text-right">{l.ip}</div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </SuperPage>
  ),
});
