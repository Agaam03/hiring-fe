// Function untuk generate started_on_text
export const getStartedOnText = (date?: Date) => {
  const d = date || new Date(); // pakai tanggal sekarang jika tidak diberikan
  const day = d.getDate(); // tanggal
  const month = d.toLocaleString("en-US", { month: "short" }); // Jan, Feb, Mar, dst
  const year = d.getFullYear();

  return `started on ${day} ${month} ${year}`;
};
