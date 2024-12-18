import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, Button } from "antd";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/products?q=${encodeURIComponent(searchQuery)}&_page=1&_limit=6&orderBy=createdAt&sort=desc`;
  };

  return (
    <div className="group relative">
      <RiSearchLine className="cursor-pointer text-lg text-dark-500" />
      <form
        onSubmit={handleSearch}
        className="absolute right-0 top-full mt-2 w-60 rounded-md border bg-white-500 p-2 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
      >
        <Input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2"
          style={{ borderColor: "#1f2937" }}
        />
        <Button type="primary" htmlType="submit" className="w-full" style={{ backgroundColor: "#1f2937", borderColor: "#1f2937" }}>
          Tìm kiếm
        </Button>
      </form>
    </div>
  );
};

export default Search;
