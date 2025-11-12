"use client";
import Image from "next/image";
import React, { useState } from "react";
import SearchJobsAdmin from "./SearchJobsAdmin";
import JobModalPage from "./JobModalPage";
import { useRouter } from "next/navigation";
import CreateJobButton from "./CreateJobButton";
import JobListContainer from "./JobListContainer";

const AdminForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const onManageJob = () => {
    router.push("/admin/manage-jobs");
  };

  return (
    <section className="flex flex-row mt-5 mx-5 gap-5">
      {/* === KONTEN KIRI === */}
      <main className="flex-1 min-w-0">
        <SearchJobsAdmin />
        {isModalOpen && (
          <JobModalPage
            onClose={() => setIsModalOpen(false)} 
          />
        )}

        <JobListContainer />
      </main>

      {/* === SIDEBAR KANAN === */}
      <aside className="w-1/5 relative hidden lg:block">
        <div className="sticky top-5">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">

            <Image
              src="/image-job-admin.jpg"
              alt="Recruitment Banner"
              width={300}
              height={200}
              className="object-cover w-full h-44"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center p-5 text-white space-y-3">
              <h2 className="text-xl font-semibold leading-tight">
                Recruit the best candidates
              </h2>
              <p className="text-sm text-gray-200">
                Create jobs, invite, and hire with ease
              </p>
              <CreateJobButton onClick={() => setIsModalOpen(true)} />
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default AdminForm;
