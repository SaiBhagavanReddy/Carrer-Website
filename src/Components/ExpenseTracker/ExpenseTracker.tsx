import { useState } from "react";
import "../../Components/ExpenseTracker/ExpenseTracker.css";
import { Wallet } from "lucide-react";
const ExpenseTracker = () => {
  interface USerDetails
  {
    exp:number,
    des:string,
    category:string,
    date:string,
    paymentMethod:string
  }
  const [userData,setuserData] = useState<USerDetails>({
    exp:0,
    des:"",
    category:"",
    date:"",
    paymentMethod:""
  })
  const SaveData = ()=>{
    if(userData.category==""||userData.date==""||userData.des==""||userData.exp==0||userData.paymentMethod=="")
    {
      alert("Please fill the all fields");
      return;
    }
    else{
      localStorage.setItem(
  "expense",
  JSON.stringify(userData));
  alert("Saved");
    }
  }
  return (
    <>
      <div className="ExpenseTrackerMain">
        <div className="ExpenseTrackerMainSection">
          <div className="ExpenseTrackerHeader">
            <Wallet />
            <div>
              <h3>Add New Expense</h3>
              <p>Enter your Expenses Below</p>
            </div>
          </div>
          <div className="ExpenseTrackerUserData">
            <label className="ExpenseTrackerLabel">
            <span>  Expense Amount</span>
              <input type="text" value={userData.exp} onChange={(e)=>{setuserData({...userData,exp:Number(e.target.value)})}} />
            </label>
            <label  className="ExpenseTrackerLabel">
              Expense Description
              <input type="textarea"  value={userData.des} onChange={(e)=>{setuserData({...userData,des:e.target.value})}}/>
            </label>
            <label  className="ExpenseTrackerLabel">
              Category
              <select value={userData.category} onChange={(e)=>{setuserData({...userData,category:e.target.value})}}>
              <option value={"Food"}> 
                Food
              </option>
              <option value={"Travel"}>
                Travel
              </option>
              <option value={"Others"}>
                Others
              </option>
              </select>
            </label>
            <label  className="ExpenseTrackerLabel">
              Date
              <input type="date" value={userData.date} onChange={(e)=>{setuserData({...userData,date:e.target.value})}}/>
            </label>
            <label  className="ExpenseTrackerLabel">
              Payment Method
              <select value={userData.paymentMethod} onChange={(e)=>{setuserData({...userData,paymentMethod:e.target.value})}}>
                <option value={"PhonePay"}>PhonePay</option>
                <option value={"Gpay"}>Gpay</option>
                <option value={"BHIM"}>BHIM</option>
              </select>
            </label>
            <div className="save-btn">
             <button onClick={()=>SaveData()}> Save</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExpenseTracker;
