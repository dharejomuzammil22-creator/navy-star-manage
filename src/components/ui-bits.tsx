import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  tone?: "default" | "gold" | "success";
}) {
  const toneClass =
    tone === "gold"
      ? "border-gold/40 bg-gradient-to-br from-gold/10 to-transparent"
      : tone === "success"
        ? "border-success/30 bg-success/5"
        : "";
  return (
    <div className={`rounded-xl border border-border bg-card p-5 ${toneClass}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          <div className="mt-2 text-3xl font-display font-semibold text-foreground">
            {value}
          </div>
          {hint && (
            <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
          )}
        </div>
        {icon && (
          <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const cls =
    s === "paid" || s === "passed" || s === "completed" || s === "enrolled" || s === "active" || s === "approved"
      ? "bg-success/15 text-success"
      : s === "pending" || s === "grading" || s === "open"
        ? "bg-warning/20 text-warning-foreground"
        : s === "failed" || s === "dropout" || s === "rejected" || s === "not approved"
          ? "bg-destructive/15 text-destructive"
          : "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${cls}`}>
      {status}
    </span>
  );
}

export function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h3 className="font-display text-base font-medium text-foreground">{title}</h3>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
