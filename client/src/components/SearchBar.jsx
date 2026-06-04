import { useState } from "react";

function SearchBar() {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search:", value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search location..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
