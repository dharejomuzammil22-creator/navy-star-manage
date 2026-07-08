import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard, StatusBadge } from "@/components/ui-bits";
import { vouchers } from "@/lib/mock-data";
import { Copy } from "lucide-react";

export const Route = createFileRoute("/student/payment")({
  component: () => (
    <>
      <PageHeader title="Payment" subtitle="Your fee vouchers and how to pay." />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard title="Vouchers">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left font-medium py-2">Voucher</th>
                  <th className="text-left font-medium py-2">Month</th>
                  <th className="text-left font-medium py-2">Due</th>
                  <th className="text-right font-medium py-2">Amount</th>
                  <th className="text-right font-medium py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((v)=>(
                  <tr key={v.id} className="border-t border-border">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{v.id}</span>
                        <button
                          onClick={() => navigator.clipboard?.writeText(v.id)}
                          className="text-muted-foreground hover:text-foreground"
                          aria-label={`Copy ${v.id}`}
                        >
                          <Copy className="h-3 w-3"/>
                        </button>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{v.month}</td>
                    <td className="py-3 text-muted-foreground">{v.due}</td>
                    <td className="py-3 text-right font-medium">Rs {v.amount.toLocaleString()}</td>
                    <td className="py-3 text-right"><StatusBadge status={v.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </div>
        <SectionCard title="How to Pay">
          <ol className="list-decimal list-inside text-sm space-y-2 text-muted-foreground">
            <li>Open your JazzCash or bank app.</li>
            <li>Select <span className="text-foreground">Fee / Voucher Payment</span>.</li>
            <li>Enter the <span className="text-foreground">Voucher ID</span> shown here.</li>
            <li>Pay the exact amount before the due date.</li>
            <li>Status updates within 24 hours.</li>
          </ol>
        </SectionCard>
      </div>
    </>
  ),
});
