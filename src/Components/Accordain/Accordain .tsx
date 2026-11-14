import { useState } from "react";

const Accordain = () => {
  const [QandAns] = useState([
    {
      Ques: "ResetPassword",
      Ans: "Enter your Proper Email",
    },
    {
      Ques: "PasswordExpiry",
      Ans: "Enter your Email with number so that will display the password expiry date",
    },
    {
      Ques: "Password-Inst",
      Ans: "Enter your Email with number so that will display the password expiry date",
    },
  ]);

  const [storeindex, setstoreindex] = useState<number[]>([]);

  const HideandShow = (index: number) => {
    setstoreindex((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div>
      <h2>Accordion</h2>

      {QandAns.map((data, ind) => (
        <div key={ind}>
          <p>
            <span style={{ fontWeight: "bold" }}>{data.Ques}</span>
          </p>

          {storeindex.includes(ind) && <pre>{data.Ans}</pre>}

          <button onClick={() => HideandShow(ind)}>
            Hide/Show
          </button>
        </div>
      ))}
    </div>
  );
};

export default Accordain;