import { redirect } from "next/navigation";
import { requireRole } from "@/lib/admin/auth";
import { PropertyEditor } from "@/components/admin/property-editor";
export default async function NewProperty() {
 if (!await requireRole("EDITOR")) redirect("/admin/login");
 return <div className="container section admin-shell"><h1>Add property</h1><PropertyEditor/></div>;
}
