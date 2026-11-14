import "./ContactUS.css";
import { BsSendFill } from "react-icons/bs";
const ContactUs = () => {
  return (
    <>
      <div className="MainContactUs">
        <div className="Header">
          <div>
            <h2>We'd love to hear from you</h2>
          </div>
          <div>
            <p>
              {" "}
              Feel free to reach out for any queries,suggestions or support
            </p>
          </div>
        </div>
        <div className="Contact-us">
          <div className="contact-des">
            <div className="card-content">
              <h2>Address</h2>
              <p>ABC College of Engineering</p>
              <p>Kukatpally, Hyderabad,</p>
              <p>Telangana - 500085</p>
              <p>India</p>
            </div>
          </div>
          <div className="contact-des1">
            <div className="card-content2">
              <h2>Phone</h2>
              <pre>0032320332</pre>
            </div>
          </div>
          <div className="contact-des2">
            <div className="card-content3">
              <h2>Email</h2>
              <pre>Department@gmail.com</pre>
            </div>
          </div>
          <div className="contact-des3">
            <div className="card-content3">
              <h2>Working Hours</h2>
              <pre>Mon-Fri</pre>
              <pre>9-5</pre>
            </div>
          </div>
        </div>
        <div className="Message">
              <div className="header-for-contact">
                <h2 style={{    paddingLeft:" 110px"}}>
                   Send Message
                </h2>
              </div>
              <div className="UserDetails">
                      <label>
                        Name <br/>
                        <input type="text" placeholder="Enter you name"/>
                      </label>
                          <label>
                        Email<br/>
                        <input type="email" placeholder="Enter your Email Id"/>
                      </label>
                          <label>
                            Subject<br/>
                        <input type="text" placeholder="Enter Subject"/>
                      </label>
                          <label>
                        Message<br/>
                        <textarea placeholder="Type your message" />
                      </label>
                      <div className="btn-send-message">
                      <button>
                        Send  Message
                      </button>
                      <div className="sendSymbol">
              <BsSendFill  style={{color:"wheat"}} />

                      </div>
              </div>
              </div>
        </div>
      </div>
    </>
  );
};
export default ContactUs;
