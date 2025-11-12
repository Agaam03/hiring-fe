"use client";
import { fetchJobById } from "@/actions/fetchJobById";
import { JobSchema } from "@/schemas";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const JobDetailsCandidate = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "UxEEhQ2KUn3EXyoaGuUI";

  const [job, setJob] = useState<z.infer<typeof JobSchema> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const getJob = async () => {
      try {
        const jobData = await fetchJobById(id);
        setJob(jobData);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };
    getJob();
  }, [id]);

  const buttonApplyOnClick = () => {
    router.push(`/apply/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <section className="w-full max-w-3xl mx-auto bg-white rounded-md shadow-sm p-6 mt-2">
      {/* === HEADER === */}
      <div className="flex justify-between items-start">
        {/* Kiri: Logo dan Job Info */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo-job-candidate.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain -mt-8"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="bg-emerald-100 text-emerald-700 font-semibold px-3 py-1 text-xs rounded-md">
                {job.jobType || "Full-Time"}
              </h1>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mt-2">
              {job.title}
            </h2>
            <p className="text-sm text-gray-500">Rakamin</p>
          </div>
        </div>

        {/* Kanan: Tombol Apply */}
        <button
          onClick={buttonApplyOnClick}
          className="bg-secondary-yellow hover:bg-secondary-yellow-hover text-gray-800 font-semibold rounded-md px-5 py-2 text-sm"
        >
          Apply
        </button>
      </div>

      {/* === GARIS PEMISAH === */}
      <hr className="my-5 border-gray-200" />

      {/* === JOB DESCRIPTION === */}
      <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
        {job.jobDescription}
      </div>
    </section>
  );
};

export default JobDetailsCandidate;
