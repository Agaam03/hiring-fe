"use server";

import { db } from "@/lib/firebase";
import { JobSchema } from "@/schemas";
import { doc, getDoc } from "firebase/firestore";
import { z } from "zod";

export type JobType = z.infer<typeof JobSchema>;

export const fetchJobById = async (id: string): Promise<JobType | null> => {
  try {
    if (!id) throw new Error("Job ID is required");

    const jobRef = doc(db, "jobs", id);
    const jobSnap = await getDoc(jobRef);

    if (!jobSnap.exists()) {
      console.warn(`Job with ID "${id}" not found`);
      return null;
    }

    const data = jobSnap.data();

    const jobWithId = { id: jobSnap.id, ...data };

    const parsed = JobSchema.safeParse(jobWithId);
    if (!parsed.success) {
      console.error(
        "Job data validation failed:",
        parsed.error.flatten()
      );
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return null;
  }
};
