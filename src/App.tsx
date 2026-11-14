import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search_for_Std from "./Components/Practices/StudentProject/SearchOne.tsx";
import {lazy} from "react"
const Add = lazy(() => import("./Components/Practices/StudentProject/Add_std.tsx"));
const Update = lazy(()=>import("./Components/Practices/StudentProject/Update_Std.tsx"));
const  Delete = lazy(()=> import("./Components/Practices/StudentProject/Delete.tsx"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search_for_Std />} />
        <Route path="/add" element={<Add />} />
        <Route path="/delete" element={<Delete/>}/>
        <Route path="/update" element={<Update/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;