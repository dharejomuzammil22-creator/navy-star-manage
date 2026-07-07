import { createFileRoute } from "@tanstack/react-router";
import { SuperAdminShell } from "@/components/SuperAdminShell";

export const Route = createFileRoute("/super-admin")({
  component: () => <SuperAdminShell />,
});
