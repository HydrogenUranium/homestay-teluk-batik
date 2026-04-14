import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/auth/session";

export const metadata = {
  title: "Admin Login | Homestay Teluk Batik",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-shoreline-gradient p-4">
      <AdminLoginForm />
    </main>
  );
}
