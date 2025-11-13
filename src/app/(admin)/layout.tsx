import Navbar from "@/components/Navbar";
import NavbarAdmin from "@/components/NavbarAdmin";
import ProtectedRoute from "@/components/ProtectedRoute";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarAdmin />
      <ProtectedRoute>{children}</ProtectedRoute>
    </>
  );
}
