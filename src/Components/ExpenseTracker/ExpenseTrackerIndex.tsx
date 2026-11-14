import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExpenseTracker from "./ExpenseTracker";
import NotificationTab from "./Notifcation"
const ExpenseTrackerIndex = ()=>{
    return(<>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={< NotificationTab/>}>
            </Route>
            <Route path="/ExpenseTracker" element={<ExpenseTracker/>}>

            </Route>
        </Routes>
    </BrowserRouter>    
    </>)
}
export default ExpenseTrackerIndex;