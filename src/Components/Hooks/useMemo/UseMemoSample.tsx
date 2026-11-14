import { useState } from "react";
import ChildComponent from "../useMemo/ChildComponent";
const UseMemoSample = () => {
    const [val,setVal] = useState(0);
    const [inputText,setinputText] = useState("");
    return (
    <>
      <h2>This is parent component</h2>
      <button onClick={()=>setVal(prev=>prev+1)}>Increment</button><br/>
      <ChildComponent val={val}/>
      <input type="text" value={inputText} onChange={(e)=>setinputText(e.target.value)}/>
    </>
  );
};
export default UseMemoSample;