import ApplyJobPage from "@/components/ApplyJobPage/indext";
import ManageJobComponent from "@/components/ManageJobComponent";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ApplyJobPage id={id} />;
};

export default Page;
