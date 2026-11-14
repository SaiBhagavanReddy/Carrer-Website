import { Navigate } from "react-router-dom";
const ProtectedRouter  = ({children}:any)=>{
const allowUser  =  localStorage.getItem("AllowUserVibe");
    if(!allowUser)
    {
     return <Navigate to={"/"}/>
    }
    return children;
    
}
export default ProtectedRouter;