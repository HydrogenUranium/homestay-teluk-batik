import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { requireAdminSession } from "@/lib/auth/session";
import { getHomestayContent } from "@/lib/data/provider";

export const metadata = {
  title: "Admin Dashboard | Homestay Teluk Batik",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const session = await requireAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const homestays = await getHomestayContent();

  return <AdminDashboard initialHomestays={homestays} adminName={session.username || "admin"} />;
}
