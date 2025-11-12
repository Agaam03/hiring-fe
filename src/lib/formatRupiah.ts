  export const formatRupiah = (value: any) => {
    const num = Number(value);
    if (isNaN(num)) return "Rp 0";
    return "Rp " + num.toLocaleString("id-ID");
  };