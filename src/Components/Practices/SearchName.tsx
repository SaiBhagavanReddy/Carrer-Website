import React, { useState } from "react";

const SearchName = () => {
  const [query, setQuery] = useState("");
  const samp = ["Sample", "Sai", "Nani"];

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />

      {
        samp
          .filter(name =>
            name.toLowerCase().includes(query.toLowerCase())
          )
          .map((name, index) => (
            <p key={index}>{name}</p>
          ))
      }
    </div>
  );
};

export default SearchName;