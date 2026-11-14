import { useState,useMemo } from "react";

const UseMemoDemo = () => {
  const items = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Pineapple",
    "Grapes",
    "Watermelon",
    "Strawberry",
    "Blueberry",
    "Papaya",
  ];
  const [search, setSearch] = useState("");
  const [count, Setcount] = useState(0);
  function searchData(e) {
    setSearch(e.target.value);
  }
const filteredItems = useMemo(() => {
  console.log("Filtering...");
  return items.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );
}, [search]);
  return (
    <>
      <h1>Use Memo Demo</h1>
      <input type="text" value={search} onChange={(e) => searchData(e)} />
      <button onClick={() => Setcount(count + 1)}>Count: {count}</button>
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};
export default UseMemoDemo;
