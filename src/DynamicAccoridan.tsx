import { useState } from "react";

const DynamicAccoridan = () => {
  interface UserData {
    Question: string;
    Answer: string;
  }

  const [userData, setUserData] = useState<UserData>({
    Question: "",
    Answer: "",
  });

  const [showData, setShowData] = useState<UserData[]>([]);
  const [hideShow, setHideShow] = useState<number | null>(null);

  const AddToList = () => {
    const duplicate = showData.some(
      (data) =>
        data.Question === userData.Question && userData.Answer === data.Answer,
    );
    if (duplicate) {
      alert("Already both question and answers are available");
      return;
    }
    setShowData((prev) => [...prev, userData]);
  };
  const Delete = (ind:number)=>{
    setShowData(showData.filter((_,del)=>del!==ind));
  }

  return (
    <>
      <div>
        <h2>Dynamic-Accoridan</h2>
        <input
          type="text"
          placeholder="Enter question"
          value={userData.Question}
          onChange={(e) =>
            setUserData({ ...userData, Question: e.target.value })
          }
        />
        <br />
        <input
          type="text"
          placeholder="Enter answer"
          value={userData.Answer}
          onChange={(e) => setUserData({ ...userData, Answer: e.target.value })}
        />
        <button onClick={() => AddToList()}>Add to List</button>
      </div>
      <div>
        {showData.map((data, ind) => (
          <div key={ind}>
            <p>
              <b>Question: </b>
              {data.Question}
              <button
                onClick={() => setHideShow(hideShow === ind ? null : ind)}
              >
                {hideShow === ind ? "Hide" : "Show"}
              </button>
            </p>
            <b>Answer: </b>
            {hideShow === ind && (
              <p>
               {data.Answer}
              </p>
            )}
            <button onClick={()=>Delete(ind)}>
                Delete this Question
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
export default DynamicAccoridan;
