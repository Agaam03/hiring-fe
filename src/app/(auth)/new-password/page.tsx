import NewPasswordForm from "@/components/AuthForm/NewPasswordForm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ oobCode?: string }>;
}) {
  const resolvedParams = await searchParams;
  const oobCode = resolvedParams.oobCode || "";

  return <NewPasswordForm oobCode={oobCode} />;
}
