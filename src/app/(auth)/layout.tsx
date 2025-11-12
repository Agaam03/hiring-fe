export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="z-9999 h-screen ">{children}</div>;
}
