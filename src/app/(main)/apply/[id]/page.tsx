import ApplyJobPage from "@/components/ApplyJobPage/indext";
import ManageJobComponent from "@/components/ManageJobComponent";
import ProtectedRoute from "@/components/ProtectedRoute";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <>
      <ProtectedRoute>
        <ApplyJobPage id={id} />
      </ProtectedRoute>
    </>
  );
};

export default Page;
