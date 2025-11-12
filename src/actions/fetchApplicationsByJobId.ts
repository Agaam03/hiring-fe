import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Ambil semua data aplikasi berdasarkan jobId
export const fetchApplicationsByJobId = async (jobId: string) => {
  try {
    const appsRef = collection(db, "applications"); // nama koleksi di Firestore
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
