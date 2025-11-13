import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchApplicationsByJobId = async (jobId: string) => {
  try {
    const appsRef = collection(db, "applications"); 
    const q = query(appsRef, where("jobId", "==", jobId));
    const querySnapshot = await getDocs(q);

    const applications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return applications;
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
};
