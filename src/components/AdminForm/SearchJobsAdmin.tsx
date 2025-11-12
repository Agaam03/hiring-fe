"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const SearchJobsAdmin = ({
  placeholder = "Search by job details",
  onSearch,
}: {
  placeholder?: string;
  onSearch?: (query: string) => void;
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-md text-black placeholder-gray focus:outline-none focus:ring-1 focus:ring-primary-green hover:ring-primary-green hover:ring-1 transition text-sm"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition "
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchJobsAdmin;
