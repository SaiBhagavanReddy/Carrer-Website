import { toast } from "react-toastify";
import "../../src/Style/Home.css";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import CloseIcon from "../assets/close.png";
type Props = {
  login: React.RefObject<HTMLInputElement>;
  login_link: React.RefObject<HTMLInputElement>;
  logout_header: React.RefObject<HTMLInputElement>;
  setRotate: React.Dispatch<React.SetStateAction<boolean>>;
  des: React.RefObject<HTMLInputElement>;
};
function Forget({ login, login_link, logout_header, setRotate, des }: Props) {
  const [email, setEmail] = useState("");
  const [otpData, setOtpData] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const sendOTP = () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    const otpValue = Math.floor(10000 + Math.random() * 90000);
    setGeneratedOtp(String(otpValue));

    const templateParams = {
      email: email,
      otp: otpValue,
    };

    emailjs
      .send(
        "service_6b9s59m",
        "template_ogms5sv",
        templateParams,
        "xVlhecB9qxWTK6c6n",
      )
      .then((response) => {
        console.log("SUCCESS!", response.status);
        toast.success("OTP Sent Successfully");
        setOtpData(true);
      })
      .catch((error) => {
        toast.error(error.text);
      });
  };
  const  CloseModal = ()=>{
    login.current.style.visibility="hidden"
    setRotate(true)
  } 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }

    const enteredOtp = newOtp.join("");

    if (enteredOtp.length === 5 && enteredOtp === generatedOtp) {
      toast.success("OTP Verified Successfully");
      setTimeout(() => {
        login.current.style.visibility = "hidden";
        login_link.current.innerText = "Logged";
        logout_header.current.style.visibility = "visible";
        setRotate((prev) => !prev);
      }, 2000);
    }
  };

  return (
    <>
      <div ref={containerRef}>
        <div className="header">
          <h1>Login With OTP </h1>
             <img
                  src={CloseIcon}
                  onClick={CloseModal}
                  style={{
                    height: "20px",
                    backgroundColor: "red",
                    marginTop:"4px"
                  }}
                /> 
        </div>
           
        <div className="input_content">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email address"
          />

          <br />

          <button
            style={{
              color: "red",
              borderRadius: "40px",
              backgroundColor: "white",
            }}
            onClick={sendOTP}
          >
            Send OTP
          </button>

          {otpData && (
            <center>
              <div className="Otp_check">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    ref={(el) => (inputs.current[i] = el)}
                    onChange={(e) => handleChange(e, i)}
                    style={{
                      width: "40px",
                      margin: "5px",
                      textAlign: "center",
                    }}
                  />
                ))}
              </div>
            </center>
          )}
        </div>
      </div>
    </>
  );
}

export default Forget;
