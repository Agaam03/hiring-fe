"use client";
import React, { useEffect, useState } from "react";
import JobListCandidate from "./JobListCandidate";
import { fetchDataJobs } from "@/actions/fetchDataJobs";
import { JobSchema } from "@/schemas";
import z from "zod";
import JobDetailsCandidate from "./JobDetailsCandidate";
import NoJobResult from "../AdminForm/NoJobResult";

type JobType = z.infer<typeof JobSchema> & { id: string };

const CandidateForm = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchDataJobs();
        const parsed = z
          .array(JobSchema.extend({ id: z.string() }))
          .safeParse(data);

        if (parsed.success) {
          setJobs(parsed.data);
        } else {
          console.error("Zod validation failed:", parsed.error);
        }
      } catch (err) {
        console.error("Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  console.log(jobs);

  if (loading)
    return <p className="text-gray-500 text-center mt-5">Loading jobs...</p>;

  if (!jobs.length) return <NoJobResult button={false} />;

  return (
    <section className="flex flex-row mt-5 gap-5 max-w-6xl mx-auto items-start justify-between">
      {/* === KONTEN KIRI === */}
      <main className="flex-1 min-w-0 overflow-y-auto h-screen">
        {jobs.map((job) => (
          <JobListCandidate key={job.id} data={job} />
        ))}
      </main>

      {/* === SIDEBAR KANAN === */}
      <aside className="w-3/5">
        <JobDetailsCandidate />
      </aside>
    </section>
  );
};

export default CandidateForm;
