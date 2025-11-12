import Image from "next/image";
import React from "react";
const NoCandidatesFound = () => {
  return (
    <div className="flex flex-col mx-auto w-full items-center justify-center mt-50">
      <Image
        src="/no-candidates.png"
        alt="no Job Result Illustration"
        width={300}
        height={300}
        className="mx-auto"
      />
      <h1 className="font-bold">No candidates found</h1>
      <p>Share your job vacancies so that more candidates will apply.</p>
    </div>
  );
};

export default NoCandidatesFound;
