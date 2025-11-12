"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobSchema } from "@/schemas";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatRupiah } from "@/lib/formatRupiah";
import { getStartedOnText } from "@/lib/getStartedOnText";

type JobFormType = z.infer<typeof JobSchema>;

const JobModalPage = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      status: "Active",
      jobType: "Full-time",
      list_card: {
        badge: "Active",
        cta: "Manage Job",
      },
      salary_range: {
        currency: "IDR",
        min: 0,
        max: 0,
      },
      application_form: {
        sections: [
          {
            title: "Minimum Profile Information Required",
            fields: [
              {
                key: "full_name",
                validation: {
                  status: "mandatory",
                },
              },
              {
                key: "photo_profile",
                validation: {
                  status: "mandatory",
                },
              },
              {
                key: "gender",
                validation: {
                  status: "mandatory",
                },
              },
              {
                key: "domicile",
                validation: {
                  status: "mandatory",
                },
              },
              {
                key: "email",
                validation: {
                  status: "mandatory",
                },
              },
              {
                key: "phone_number",
                validation: {
                  status: "mandatory",
                },
              },
              {
                key: "linkedin_link",
                validation: {
                  status: "mandatory",
                },
              },
              {
                key: "date_of_birth",
                validation: {
                  status: "mandatory",
                },
              },
            ],
          },
        ],
      },
    },
  });

  const { fields: sections } = useFieldArray({
    control,
    name: "application_form.sections",
  });

  const onSubmit = async (data: JobFormType) => {
    try {
      const displayText =
        data.salary_range.currency === "IDR"
          ? `${formatRupiah(data.salary_range.min)} - ${formatRupiah(
              data.salary_range.max
            )}`
          : `$${data.salary_range.min.toLocaleString()} - $${data.salary_range.max.toLocaleString()}`;
      const started_on_text = getStartedOnText();
      const docRef = await addDoc(collection(db, "jobs"), {
        ...data,
        slug: data.title.trim().toLowerCase().replace(/\s+/g, "-"),
        salary_range: {
          ...data.salary_range,
          display_text: displayText,
        },
        list_card: {
          ...data.list_card,
          badge: data.status === "Active" ? "Active" : "Inactive",
          started_on_text,
        },
        createdAt: serverTimestamp(),
      });

      console.log(docRef);
      alert("Job successfully published!");
      onClose();
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Failed to publish job. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Job Opening</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* === FORM === */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-3">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex. Front End Engineer"
              {...register("title")}
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-black text-sm focus:ring-1 focus:ring-primary-green hover:ring-primary-green transition"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type<span className="text-red-500">*</span>
            </label>
            <select
              {...register("jobType")}
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-primary-green hover:ring-primary-green hover:ring-1 transition text-sm"
            >
              <option value="Full-time" className="font-bold">
                Full-time
              </option>
              <option value="Contract" className="font-bold">
                Contract
              </option>
              <option value="Part-time" className="font-bold">
                Part-time
              </option>
              <option value="Internship" className="font-bold">
                Internship
              </option>
              <option value="Freelance" className="font-bold">
                Freelance
              </option>
            </select>
            {errors.jobType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.jobType.message}
              </p>
            )}
          </div>
          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Ex."
              {...register("jobDescription")}
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-black placeholder-gray focus:outline-none focus:ring-1 focus:ring-primary-green hover:ring-primary-green hover:ring-1 transition text-sm h-24"
            />
            {errors.jobDescription && (
              <p className="text-red-500 text-xs mt-1">
                {errors.jobDescription.message}
              </p>
            )}
          </div>

          {/* Job Salary */}
          <div>
            <p className="font-medium text-gray-700 mb-2">Job Salary</p>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs text-gray-600">Min Salary</label>
                <input
                  type="number"
                  {...register("salary_range.min", { valueAsNumber: true })}
                  placeholder="7000000"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-black text-sm focus:ring-1 focus:ring-primary-green hover:ring-primary-green transition"
                />
                {errors.salary_range?.min && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.salary_range.min.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-600">Max Salary</label>
                <input
                  type="number"
                  {...register("salary_range.max", { valueAsNumber: true })}
                  placeholder="8000000"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-black text-sm focus:ring-1 focus:ring-primary-green hover:ring-primary-green transition"
                />
                {errors.salary_range?.max && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.salary_range.max.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <label className="text-xs text-gray-600">Currency</label>
              <select
                {...register("salary_range.currency")}
                className="px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-1 focus:ring-primary-green hover:ring-primary-green transition"
              >
                <option value="IDR">IDR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          {/* Application Form Requirements */}
          <div>
            <p className="font-medium text-gray-700 mb-2">
              Application Form Fields
            </p>
            <div className="border rounded-md divide-y">
              {sections.map((section, sIndex) => (
                <div key={section.id} className="p-3">
                  <p className="text-sm font-semibold mb-2">
                    {section.title || "Minimum Profile Information Required"}
                  </p>

                  {section.fields.map((field, fIndex) => {
                    const keyPath =
                      `application_form.sections.${sIndex}.fields.${fIndex}.validation.status` as const;

                    const current = watch(keyPath);

                    return (
                      <div
                        key={fIndex}
                        className="flex justify-between items-center py-2 text-sm text-gray-700"
                      >
                        <span className="capitalize">
                          {field.key.replace(/_/g, " ")}
                        </span>

                        <div className="flex gap-2">
                          {(["mandatory", "optional", "off"] as const).map(
                            (opt) => {
                              const active =
                                current === opt
                                  ? opt === "off"
                                    ? "bg-gray-400 text-white border-gray-400"
                                    : opt === "mandatory"
                                    ? "border-primary-green border-1 text-primary-green"
                                    : "border-primary-green border-1 text-primary-green"
                                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100";

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    setValue(keyPath, opt, {
                                      shouldValidate: true,
                                    })
                                  }
                                  className={`px-3 py-1 rounded-full border text-[12px] transition-all cursor-pointer ${active}`}
                                >
                                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Publish Button */}
          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              className="bg-primary-green text-white text-xs px-6 py-2 rounded-md hover:bg-primary-hover transition cursor-pointer"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModalPage;
