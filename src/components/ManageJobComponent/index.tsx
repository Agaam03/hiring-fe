"use client";

import { fetchApplicationsByJobId } from "@/actions/fetchApplicationsByJobId";
import { fetchJobById } from "@/actions/fetchJobById";
import { formatDate } from "@/lib/formatDate";
import { getStartedOnText } from "@/lib/getStartedOnText";
import { JobSchema } from "@/schemas";
import { get } from "http";
import React, { useEffect, useState } from "react";
import z from "zod";
import NoCandidatesFound from "./NoCandidatesFound";

interface Applicant {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  domicile: string;
  gender: string;
  linkedin_link: string;
}

const ManageJobComponent = ({ jobId }: { jobId: string }) => {
  const [applications, setApplications] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;
    const getApplications = async () => {
      setLoading(true);
      const apps = await fetchApplicationsByJobId(jobId);
      setApplications(apps as Applicant[]);
      setLoading(false);
    };
    getApplications();
  }, [jobId]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading applications...</p>;
  }
  if (applications.length === 0) {
    return <NoCandidatesFound />;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Manage Job Applicants</h1>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-black text-sm text-left uppercase">
            <tr>
              <th className="p-5 border">Nama Lengkap</th>
              <th className="p-5">Email Address</th>
              <th className="p-5">Phone Numbers</th>
              <th className="p-5">Date of Birth</th>
              <th className="p-5">Domicile</th>
              <th className="p-5">Gender</th>
              <th className="p-5">Link LinkedIn</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((person, index) => (
              <tr key={index}>
                <td className="px-4 py-5 border-b bg-white shadow-md">
                  {person.full_name}
                </td>
                <td className="px-4 py-5 border-b">{person.email}</td>
                <td className="px-4 py-5 border-b">{person.phone_number}</td>
                <td className="px-4 py-5 border-b">
                  {formatDate(person.date_of_birth)}
                </td>
                <td className="px-4 py-5 border-b">{person.domicile}</td>
                <td className="px-4 py-5 border-b">{person.gender}</td>
                <td className="px-4 py-5 border-b text-blue-600 underline">
                  <a
                    href={person.linkedin_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {person.linkedin_link}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageJobComponent;
