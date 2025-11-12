import { JobType } from "@/actions/fetchDataJobs";
import React from "react";

interface JobListProps {
  data: JobType;
  onManage?: () => void;
}

const JobList: React.FC<JobListProps> = ({ data, onManage }) => {
  const statusColor =
    data.status === "Active"
      ? "bg-green-100 text-green-700 border border-green-300"
      : "bg-red-100 text-red-700 border border-red-300";
  console.log(data);

  return (
    <main className="w-full flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 hover:shadow-md transition-all duration-200 mt-2">
      {/* === LEFT SECTION === */}
      <div className="flex flex-col gap-2">
        {/* Status dan tanggal */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-md ${statusColor}`}
          >
            {data.status}
          </span>
          <span className="text-xs text-gray-600 border border-gray-400 py-1 px-2 rounded-md">
            {data.list_card.started_on_text}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="text-base font-bold text-gray-800">{data.title}</h3>

        {/* Salary */}
        <p className="text-sm text-gray-600">
          {data.salary_range.display_text}
        </p>
      </div>

      {/* === RIGHT SECTION === */}
      <button
        onClick={onManage}
        className="bg-primary-green hover:bg-primary-hover text-white text-sm font-medium px-4 py-1.5 rounded-md transition-all duration-200 cursor-pointer"
      >
        Manage Job
      </button>
    </main>
  );
};

export default JobList;
