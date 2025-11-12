import { db } from "@/lib/firebase";
import { formatRupiah } from "@/lib/formatRupiah";
import { JobSchema } from "@/schemas";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import z from "zod";

export type JobType = z.infer<typeof JobSchema>;

export const fetchDataJobs = async (): Promise<JobType[]> => {
  try {
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const jobs: JobType[] = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<JobType, 'id'>;
      return {
        id: doc.id,
        ...data,
      };
    });

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
