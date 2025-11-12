import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  return (
    <>
      {message && message.length > 0 && (
        <div className=" text-danger-red flex items-center gap-2 py-1 text-sm animation-fade-in justify-center">
          <FaTriangleExclamation />
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default FormError;
