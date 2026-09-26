import { redirect } from "next/navigation";
import { requireRole } from "@/lib/admin/auth";
import { getZooplaStatus } from "@/lib/integrations/zoopla";

export default async function AdminSettingsPage() {
  const session = await requireRole("ADMIN");
  if (!session) redirect("/admin/login");

  const zoopla = getZooplaStatus();
  return (
    <div className="container section admin-shell">
      <div className="admin-header-row">
        <div>
          <p className="overline">Integrations</p>
          <h1>Settings</h1>
        </div>
      </div>

      <section className="admin-panel">
        <h2>Zoopla integration</h2>
        <p className="muted">Status: {zoopla.status}</p>
        <p>No live Zoopla transport is implemented. Configuration alone does not enable sending listings.</p>
        <p className="muted small">
          Zoopla is intentionally not connected unless ABS Properties has approved feed credentials and documentation.
        </p>
      </section>
    </div>
  );
}
