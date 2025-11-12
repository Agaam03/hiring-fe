// app/admin/manage-jobs/[id]/page.tsx
import ManageJobComponent from "@/components/ManageJobComponent";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <ManageJobComponent jobId={id} />;
};

export default Page;
