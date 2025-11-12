import Navbar from "@/components/Navbar";
import NavbarAdmin from "@/components/NavbarAdmin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarAdmin />
      {children}
    </>
  );
}
