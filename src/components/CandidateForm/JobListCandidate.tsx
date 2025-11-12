"use client";
import React, { useEffect } from "react";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { JobSchema } from "@/schemas";
import z from "zod";

type JobType = z.infer<typeof JobSchema> & { id: string };

interface JobListCandidateProps {
  data: JobType;
}

const JobListCandidate: React.FC<JobListCandidateProps> = ({ data }) => {
  const [kotaDomicile, setKotaDomicile] = React.useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  useEffect(() => {
    generateRandomDomicile();
  }, []);

  const generateRandomDomicile = () => {
    const cities = [
      "Jakarta",
      "Bandung",
      "Surabaya",
      "Yogyakarta",
      "Batam",
      "Mataram",
      "Jayapura",
      "Semarang",
      "Medan",
      "Denpasar",
      "Makassar",
    ];
    const randomIndex = Math.floor(Math.random() * cities.length);
    setKotaDomicile(cities[randomIndex]);
  };

  const handleClick = () => {
    router.push(`?id=${data.id}`, { scroll: false });
  };

  return (
    <main
      onClick={handleClick}
      className={`w-full flex items-center justify-between bg-white rounded-md shadow-sm border px-5 py-4 hover:shadow-md transition-all duration-200 mt-2 mr-8 cursor-pointer ${
        selectedId === data.id ? "border-emerald-500" : "border-gray-100"
      }`}
    >
      <div className="flex flex-col gap-2">
        {/* Job Title */}
        <div className="flex flex-row items-center gap-3">
          <Image
            src="/logo-job-candidate.png"
            alt="Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <div>
            <h3 className="text-base font-bold text-gray-800">{data.title}</h3>
            <p className="text-sm text-gray-500">Rakamin</p>
          </div>
        </div>

        {/* Domicile */}
        <div className="flex flex-row items-center gap-1">
          <IoLocationOutline />
          <p className="text-sm text-gray-600">{kotaDomicile}</p>
        </div>

        {/* Salary */}
        <div className="flex flex-row items-center gap-1">
          <LiaMoneyBillSolid />
          <p className="text-sm text-gray-600">
            {data.salary_range.display_text}
          </p>
        </div>
      </div>
    </main>
  );
};

export default JobListCandidate;
