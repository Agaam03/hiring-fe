import Image from "next/image";
import React, { useState } from "react";
import JobModalPage from "./JobModalPage";
import CreateJobButton from "./CreateJobButton";

const NoJobResult = ({ button }: { button: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col mx-auto w-full items-center justify-center mt-50">
      <Image
        src="/no-job.png"
        alt="no Job Result Illustration"
        width={300}
        height={300}
        className="mx-auto"
      />
      <h1 className="font-bold">No job openings available</h1>
      <p>Create a job opening now and start the candidate process.</p>
--
      {button && (
        <>
          <CreateJobButton
            onClick={() => setIsModalOpen(true)}
            style="mt-3 bg-secondary-yellow hover:bg-secondary-yellow-hover  text-white font-semibold py-2 px-5 rounded-md   flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer w-fit"
          />
          {isModalOpen && (
            <JobModalPage onClose={() => setIsModalOpen(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default NoJobResult;
