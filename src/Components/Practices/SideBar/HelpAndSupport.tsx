import { useState } from "react";
import "../SideBar/HelpAndSupport.css";
const HelpAndSupport = () => {
  const questions = [
    {
      question: "How do I reset the password?",
      answer:
        "If you have forgotten your password, click on the 'Forgot Password' option available on the login page...",
    },
    {
      question: "How can I pay my fees online?",
      answer:
        "You can conveniently pay your college fees through the Student Portal...",
    },
    {
      question: "How do I download my hall ticket?",
      answer:
        "Hall tickets are made available on the Student Portal before the commencement of examinations...",
    },
    {
      question: "How can I check my attendance?",
      answer:
        "Your attendance details can be viewed by logging into the Student Portal...",
    },
  ];
  const [answer, showAnswer] = useState<number|null>(null);
  const HideAndShow = (index)=>{
    showAnswer(answer === index ? null : index);
  }
  return (
    <>
      <div className="helpSupportMain">
        <div className="header">
          <h2>How can we Help you today?</h2>
          <p>We're here to support you. Choose way to get assistance</p>
        </div>
        <div className="help-menu-details">
          <div className="card">
            <h3>💬 Live Chat</h3>
            <p>Chat with our support team in real time.</p>
            <button>
              Start Chat <div style={{ color: "blue" }}> &raquo;</div>{" "}
            </button>
          </div>
          <div className="card">
            <h3>📞 Call Us</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="card">
            <h3>📧 Email Us</h3>
            <p>support@abccollege.edu.in</p>
          </div>

          <div className="card">
            <h3>🕒 Support Hours</h3>
            <p>Mon - Fri</p>
            <p>9:00 AM - 5:00 PM</p>
          </div>
        </div>
        <div className="inputData">
          <div className="RaiseTicket">
            <div className="Detailsforticket">
              <h2>Raise a support ticket</h2>
              <div className="userenteringdata">
                <label>
                  Name
                  <br />
                  <input type="text" />
                </label>
                <label>
                  Email
                  <br />
                  <input type="email" />
                </label>
                <label>
                  Category
                  <br />
                  <select>
                    <option>1</option>
                  </select>
                </label>
                <label>
                  Priority
                  <br />
                  <select>
                    <option>1</option>
                  </select>
                </label>
                <label>
                  Description
                  <br />
                  <textarea />
                </label>
                <label>
                  Attachment (Optional)
                  <br />
                  <input type="file" />
                </label>
                <div className="submit-btn">
                  <button>Submit ticket</button>
                </div>
              </div>
            </div>
          </div>
          <div className="FrequentlyAskedQuestions">
            <h2>Frequently Asked questions</h2>
            <div className="QuestionData">
              {questions.map((data, index) => (
                <>
                  <div className="listofqueries">
                    <div className="questionwithBtn">
                      <p key={index}>{data.question}</p>
                      <div className="showAnswer">
                        <button
                          onClick={() =>HideAndShow(index)}
                        >{`>`}</button>
                      </div>
                    </div>
                    {answer === index &&<div className="answer">
                        <p>{data.answer}</p>
                        </div>}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HelpAndSupport;
