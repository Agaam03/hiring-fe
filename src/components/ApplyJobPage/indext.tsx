"use client";

import { fetchJobById } from "@/actions/fetchJobById";
import { JobSchema } from "@/schemas";
import { useEffect, useState } from "react";
import z from "zod";
import { Calendar22 } from "./CalenderForm";
import { MdOutlineFileUpload } from "react-icons/md";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function ApplyJobPage({ id }: { id: string }) {
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    gender: "",
    domicile: "",
    phone_number: "",
    email: "",
    linkedin_link: "",
  });

  const [job, setJob] = useState<z.infer<typeof JobSchema> | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const getJob = async () => {
      try {
        const jobData = await fetchJobById(id);
        setJob(jobData);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };
    getJob();
  }, [id]);

  // Upload foto
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "applications"), {
        ...formData,
        photo: photo || null,
        jobId: id,
        createdAt: serverTimestamp(),
      });
      alert("Application Submitted! ID: " + docRef.id);
      console.log("Data saved to Firestore:", formData);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to submit application!");
    }
  };

  const renderField = (field: any) => {
    if (field.validation.status === "off") return null;

    console.log(field.validation.status);

    const required = field.validation.status === "mandatory";
    const name = field.key;

    switch (name) {
      case "photo_profile":
        return (
          <div
            key={name}
            className="flex flex-col items-start mb-6 border-b pb-3"
          >
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-neutral-300 mb-3"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-neutral-200 flex items-center justify-center text-gray-500 mb-3">
                No Photo
              </div>
            )}
            <label className="cursor-pointer border border-neutral-300 px-3 py-1 rounded-md hover:opacity-90 transition">
              <div className="flex flex-row items-center justify-center gap-1">
                <MdOutlineFileUpload size={20} />
                <p className="text-black font-bold text-sm"> Take a Picture </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>
        );

      case "full_name":
        return (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">
              Full name {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-black text-sm focus:ring-1 focus:ring-primary-green hover:ring-primary-green transition"
              placeholder="Enter your full name"
              required={required}
            />
          </div>
        );

      case "date_of_birth":
        return (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">
              Date of birth{" "}
              {required && <span className="text-red-500">*</span>}
            </label>
            <Calendar22
              onDateChange={(d) =>
                setFormData({
                  ...formData,
                  date_of_birth: d?.toISOString() || "",
                })
              }
            />
          </div>
        );

      case "gender":
        return (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">
              Pronoun (gender){" "}
              {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  required={required}
                />
                She/her (Female)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  required={required}
                />
                He/him (Male)
              </label>
            </div>
          </div>
        );

      case "domicile":
        return (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">
              Domicile {required && <span className="text-red-500">*</span>}
            </label>
            <select
              name="domicile"
              value={formData.domicile}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-black text-sm focus:ring-1 focus:ring-primary-green hover:ring-primary-green transition"
              required={required}
            >
              <option value="">Choose your domicile</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Yogyakarta">Yogyakarta</option>
            </select>
          </div>
        );

      case "phone_number":
        return (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">
              Phone number {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="+62 81XXXXXXXXX"
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-black text-sm focus:ring-1 focus:ring-primary-green hover:ring-primary-green transition"
              required={required}
            />
          </div>
        );

      case "email":
        return (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">
              Email {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-black text-sm focus:ring-1 focus:ring-primary-green hover:ring-primary-green transition"
              required={required}
            />
          </div>
        );

      case "linkedin_link":
        return (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">
              LinkedIn {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="url"
              name="linkedin_link"
              value={formData.linkedin_link}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-black text-sm focus:ring-1 focus:ring-primary-green hover:ring-primary-green transition"
              required={required}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold mb-6 text-left">{job?.title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {job?.application_form?.sections?.map((section, idx) => {
            const fieldOrder = [
              "photo_profile",
              "full_name",
              "date_of_birth",
              "gender",
              "domicile",
              "phone_number",
              "email",
              "linkedin_link",
            ];

            return (
              <div key={idx} className="space-y-4">
                {section.fields
                  .slice()
                  .sort(
                    (a: any, b: any) =>
                      fieldOrder.indexOf(a.key) - fieldOrder.indexOf(b.key)
                  )
                  .map((field: any) => renderField(field))}
              </div>
            );
          })}

          <button
            type="submit"
            className="w-full bg-primary-green text-white py-2 rounded-md hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
