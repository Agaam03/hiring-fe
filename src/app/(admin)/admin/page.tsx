import AdminForm from "@/components/AdminForm";
import ManageJobComponent from "@/components/ManageJobComponent";
import NoCandidatesFound from "@/components/ManageJobComponent/NoCandidatesFound";
import ProtectedRoute from "@/components/ProtectedRoute";

import React from "react";

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <AdminForm />
      </ProtectedRoute>
    </div>
  );
};

export default page;
