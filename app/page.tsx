"use client";

import Navbar from "./components/Navbar";

export default function Home() {


  return (
    <div className="flex">
      <div className="flex-1 mr-64">
        <Navbar
          onFilterChange={(value) => console.log("Filter:", value)}
          onSearch={(value) => console.log("Search:", value)}
        />

      </div>

    </div>
  );
}
