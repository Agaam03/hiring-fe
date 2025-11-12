"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import JobList from "./JobList";
import NoJobResult from "./NoJobResult";
import { fetchDataJobs, JobType } from "@/actions/fetchDataJobs";

const JobListContainer = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const manageJob = (id: string) => {
    router.push(`/admin/manage-jobs/${id}`);
  };

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchDataJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error loading jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading)
    return <p className="text-gray-500 text-center mt-5">Loading jobs...</p>;

  if (!jobs || jobs.length === 0) return <NoJobResult button />;

  return (
    <div className="w-full flex flex-col gap-1">
      {jobs.map(
        (job) =>
          job.id && (
            <JobList
              key={job.id}
              data={job}
              onManage={() => manageJob(job.id!)}
            />
          )
      )}
    </div>
  );
};

export default JobListContainer;
