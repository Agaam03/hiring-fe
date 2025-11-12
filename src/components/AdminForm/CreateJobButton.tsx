import React from "react";

interface CreateJobProps {
  style?: string;
  onClick?: () => void;
}

const CreateJobButton: React.FC<CreateJobProps> = ({ style, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        style
          ? style
          : "bg-primary-green hover:bg-primary-hover text-white font-semibold py-2 px-5 rounded-md w-full flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
      }
    >
      Create a new Job
    </button>
  );
};

export default CreateJobButton;
