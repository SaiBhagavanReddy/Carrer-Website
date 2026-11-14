import { lazy, useState } from "react";
import "../Tabs/Tab.css";
const Home = lazy(() => import("../Tabs/Home"));
const MenuTab = () => {
  const [Tab, setTab] = useState("All");

  return (
    <>
      <div className="MenuTabMain">
        <div className="headerTab">
          <h2>Tabs</h2>
        </div>
        <div className="switchTabs">
          <button onClick={() => setTab("All")} className={Tab==="All"?"active":""}>Home</button>
          <button onClick={() => setTab("Store")} className={Tab==="Store"?"active":""}>Store</button>
          <button onClick={() => setTab("Medical")} className={Tab==="Medical"?"active":""}>Medical</button>
          <button onClick={() => setTab("Total")} className={Tab==="Total"?"active":""}>Total details</button>
        </div>
        <div>
          {Tab === "All" ? (
            <>
              <Home />
            </>
          ) : Tab === "Store" ? (
            <></>
          ) : Tab === "Medical" ? (
            <></>
          ) : Tab === "Total" ? (
            <></>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default MenuTab;
