import { useState } from "react";
import emailjs from "emailjs-com";

const Otpvalidation = () => {
  const [email, setEmail] = useState("");

  const sendOTP = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const templateParams = {
      email: email,
      otp: otp,
    };

    emailjs
      .send(
        "service_6b9s59m",
        "template_ogms5sv",
        templateParams,
        "xVlhecB9qxWTK6c6n",
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("OTP sent successfully!");
      })
      .catch((error) => {
        console.log("FAILED...", error);
      });

    console.log("Generated OTP:", otp);
  };

  return (
    <>
      <center>
        <input type="number" />
      </center>

      <br />

      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={sendOTP}>Send OTP</button>
    </>
  );
};

export default Otpvalidation;
