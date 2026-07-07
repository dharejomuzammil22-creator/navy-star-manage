import { createFileRoute } from "@tanstack/react-router";
import { SuperPage, SimpleTable } from "@/components/SuperPage";
import { StatusBadge } from "@/components/ui-bits";
import { students } from "@/lib/mock-data";
import { Wallet } from "lucide-react";

export const Route = createFileRoute("/super-admin/payments")({
  component: () => {
    const rows = students.slice(0, 20).map((s, i) => ({
      voucher: `V-9${(1000 + i).toString()}`,
      student: s.name,
      course: s.course,
      amount: 2500 + (i % 3) * 500,
      due: `2026-07-${(10 + (i % 20)).toString().padStart(2, "0")}`,
      status: s.payment,
    }));
    const collected = rows.filter((r) => r.status === "Paid").reduce((a, b) => a + b.amount, 0);
    const outstanding = rows.filter((r) => r.status !== "Paid").reduce((a, b) => a + b.amount, 0);
    return (
      <SuperPage
        title="Payments"
        subtitle="Fee vouchers & collections"
        stats={[
          { label: "Vouchers", value: rows.length, icon: <Wallet className="h-5 w-5" />, tone: "gold" },
          { label: "Collected", value: "₨ " + collected.toLocaleString(), tone: "success" },
          { label: "Outstanding", value: "₨ " + outstanding.toLocaleString() },
          { label: "Overdue", value: 3 },
        ]}
      >
        <SimpleTable
          columns={["Voucher", "Student", "Course", "Amount", "Due", "Status"]}
          rows={rows.map((r) => [
            r.voucher,
            r.student,
            r.course,
            "₨ " + r.amount.toLocaleString(),
            r.due,
            <StatusBadge key={r.voucher} status={r.status} />,
          ])}
        />
      </SuperPage>
    );
  },
});
