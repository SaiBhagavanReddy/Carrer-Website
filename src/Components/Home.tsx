import "../../src/Style/Home.css";
import { useInView } from "react-intersection-observer";
import logo from "../assets/main-logo.png";
import img1 from "../assets/card-image1.jpg";
import img2 from "../assets/card-image2.jpg";
import img3 from "../assets/card-image3.jpg";
import img4 from "../assets/img4.avif";
import img5 from "../assets/img5.avif";
import CloseIcon from "../assets/close.png";
import Forget from "./Forget_password";
import Registermodal from "./Registermodal";
import CircularProgress from "@mui/material/CircularProgress";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function HomePage() {
  type CartItem = {
    id: string;
    image: string;
    value: number;
    val: number;
  };
  const [category, setCategory] = useState("men");
  const [isOpen, setIsOpen] = useState(false);
  const [cart, cartOpen] = useState(false);
  const referForCart = useRef(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [wishListImage, setWishListImage] = useState<string[]>([]);
  const [cartImage, setCartListImage] = useState<CartItem[]>([]);
  const [cartCount, SetCount] = useState(0);
  const cartVal = useRef(0);
  const cartValue = useRef(0);
  const Animation_on_women = useRef(0);
  const Animation_on_women2 = useRef(null);
  const shoe1 = useRef(null);
  const shoe2 = useRef(null);
  const shoe3 = useRef(null);
  const login = useRef(null);
  const des = useRef(0);
  const hide_for_forget = useRef(null);
  const header = useRef(0);
  const [Username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [rotate, setRotate] = useState(true);
  const login_link = useRef(null);
  const logout_header = useRef(null);
  const [remember, setRemember] = useState(false);
  const username = useRef(null);
  const [registerModal, setregisterModal] = useState(false);
  const [Register_disabled, SetRegister_disabled] = useState(false);
  const [openPage, setOpenWishPage] = useState(false);
  const [cart_item, setCartModal] = useState(false);
  const [itemcost, setItemcost] = useState(Number);
  const [itemsForCart, setItemsForCart] = useState<
    { id: string; value: number }[]
  >([]);
  const [total, setTotal] = useState(0);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [process, setProcess] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.4,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 1,
  });
  function Credentials() {
    if (Username.length === 0 || password.length === 0) {
      alert("Please fill all fields");
    }
  if (Username.length !== 0 && password.length !== 0) {

  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
    const user = data.find((item:any) =>
        item.name === Username &&
        item.password === password
    );

    if (user) {
         setProcess(true)
          setTimeout(()=>{setProcess(false)},3000)
          setTimeout(()=>{toast.success("Login successful"),setProcess(false)},1000)
            login_link.current.innerText = "Logged";
            logout_header.current.style.visibility = "visible";
                login.current.style.visibility = "hidden";
            
    } else{
              setProcess(true)
              setTimeout(()=>{setProcess(false)},3000)
              setTimeout(()=>{toast.error("Invalid Credentials"),setProcess(false)},1000)
            }

      SetRegister_disabled(true);
    })
    .catch((err) => {
      console.log(err);
    });
} 
    
  }
  useEffect(() => {
    const sum = itemsForCart.reduce((acc, item) => acc + item.value, 0);
    setTotal(sum);
  }, [itemsForCart]);

  useEffect(() => {
    logout_header.current.style.visibility = "hidden";
  }, []);

  useEffect(() => {
    if (remember) {
      Setusername(sessionStorage.getItem("Username") || "");
      Setpassword(sessionStorage.getItem("Password") || "");
    }
  }, [remember]);
  function CloseModal() {
    login.current.style.visibility = "hidden";
    des.current?.classList.remove("Login-animation");
    if (Username.length == 0 || password.length == 0) {
      Setusername("");
      Setpassword("");
    }
  }

  function forget_password() {
    des.current?.classList.add("forgot_password");
    header.current.style.visibility = "hidden";
    setRotate(false);
  }
  function totalValue(
    val1: number,
    val2: number,
    checked: boolean,
    id: number,
  ) {
    const newValue = val1 * val2;

    if (checked) {
      setItemsForCart((prev) => [...prev, { id, value: newValue }]);
      setTotal((prev) => prev + newValue);
    } else {
      setItemsForCart((prev) => prev.filter((item) => item.id !== id));
      setTotal((prev) => prev - newValue);
    }
  }
  function handleMouseEnter(src: string, num: number) {
    cartOpen(true);
    setSelectedImage(src);
    setItemcost(num);
  }
  function Login() {
    login.current.style.visibility = "visible";
    username.current.focus();
    des.current?.classList.add("Login-animation");
    des.current?.classList.remove("forgot_password");
  }
  function Logout() {
    SetRegister_disabled(false);
    setRemember(false);
    Setusername("");
    Setpassword("");
    login_link.current.innerText = "Login";
    toast.success("Logout successfully");
    logout_header.current.style.visibility = "hidden";
    des.current?.classList.remove("forgot_password");
    des.current?.classList.remove("Login-animation");
  }
  // function handleCheckout() {
  //   navigate("/Card");
  // }
  function Addcart(src: string, num: number) {
    if (!src) return;

    setCartListImage((prev) => {
      cartVal.current.innerText = "Item added to cart";

      const exists = prev.find((item) => item.image === src);

      if (exists) {
        return prev.map((item) =>
          item.image === src ? { ...item, value: item.value + 1 } : item,
        );
      }
      return [
        ...prev,
        {
          id: Date.now().toString(),
          image: src,
          value: 1,
          val: itemcost,
        },
      ];
    });
  }
  function setCategoryForWomen() {
    setCategory("women");
  }
  function reload() {
    window.location.reload();
  }

  const openCartPage = () => {
    setCartModal(true);
  };
  useEffect(() => {
    if (category === "women") {
      requestAnimationFrame(() => {
        Animation_on_women.current?.classList.add("Images_for_animation");
        Animation_on_women2.current?.classList.add("Images_for_animation1");
      });
    } else {
      shoe1.current?.classList.add("Image_for_animation_men");
      shoe2.current?.classList.add("Image_for_animation_men1");
      shoe3.current?.classList.add("Image_for_animation_men2");
    }
  }, [category]);
  const removeItem = (index: number) => {
    setWishListImage((prev) => prev.filter((_, i) => i !== index));
  };

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
  interface ModalProps2 {
    toOpen: boolean;
    toClose: () => void;
    children: React.ReactNode;
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  }
  interface ModalProps3 {
    toOpen: boolean;
    toClose: () => void;
    children: React.ReactNode;
  }
  interface ModalProps4 {
    toOpen: boolean;
    toClose: () => void;
    children: React.ReactNode;
  }
  function handleMouseLeave() {
    cartOpen(false);
    SetCount(0);
  }
  const AddToWishList = (src: string) => {
    if (!src) return;
    setWishListImage((prev) => {
      if (prev.includes(src)) {
        return prev.filter((item) => item !== src);
      } else {
        return [...prev, src];
      }
    });
  };

  function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;
    return createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          {children}
          <button style={{ marginLeft: "60px" }} onClick={onClose}>
            Close
          </button>
        </div>
      </div>,
      document.body,
    );
  }
  function Register({ toOpen, children }: ModalProps2) {
    if (!toOpen) return null;

    return createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "450px",
            height: "auto",
            maxWidth: "500px",
            maxHeight: "550px",
          }}
        >
          <div>{children}</div>
        </div>
      </div>,
      document.body,
    );
  }
  function LikedPage({ toOpen, children }: ModalProps3) {
    if (!toOpen) return null;

    return createPortal(
      <div
        style={{
          position: "fixed",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          inset: "0px",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderRadius: "8px",
            width: "600px",
            height: "auto",
            color: "wheat",
            background: "linear-gradient(45deg, black, transparent)",
          }}
        >
          {" "}
          <div>{children}</div>
        </div>
      </div>,
      document.body,
    );
  }
  function Cartmodal({ toOpen, children }: ModalProps4) {
    if (!toOpen) {
      return null;
    }
    return createPortal(
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.5)", // overlay
        }}
      >
        <div
          style={{
            padding: "20px",
            borderRadius: "8px",
            width: "600px",
            maxHeight: "80vh",
            overflowY: "auto", // scroll if large table
            color: "wheat",
            background: "gray",
          }}
        >
          {children}
        </div>
      </div>,
      document.body,
    );
  }
  return (
    <>
      {/* NAVBAR */}
      <div className="nav">
        <img
          src={logo}
          style={{
            width: "150px",
            height: "40px",
            marginTop: "10px",
            borderRadius: "10px",
          }}
          onClick={reload}
          alt="logo"
        />
        <div className="main">
          <button onClick={() => setCategory("men")}>Men</button>
          <button onClick={() => setCategoryForWomen()}>Women</button>
          <button onClick={Login} ref={login_link}>
            Login
          </button>
          <button
            onClick={() => {
              setProcess(true);

              setTimeout(() => {
                setProcess(false);
                setregisterModal(true);
              }, 1000);
            }}
            disabled={Register_disabled}
            style={{ cursor: Register_disabled ? "not-allowed" : "pointer" }}
          >
            Register
          </button>
          <button onClick={Logout} ref={logout_header}>
            Logout
          </button>
        </div>
      </div>
      {/* MEN SECTION */}
      {category === "men" && (
        <>
          <div className="Images">
            <img src={img1} ref={shoe1} alt="" />
            <img src={img2} ref={shoe2} alt="" />
            <br />
          </div>

          <div className="images_column">
            <img src={img3} ref={shoe3} alt="" />
          </div>
        </>
      )}
      {/* WOMEN SECTION */}
      {category === "women" && (
        <>
          <div className="Images" style={{ marginLeft: "150px" }}>
            <img className="one" ref={Animation_on_women} src={img4} alt="" />
            <img
              src={img5}
              ref={Animation_on_women2}
              style={{ marginLeft: "165px" }}
              alt=""
            />
            <br />
          </div>
        </>
      )}

      <div
        ref={ref2}
        className={`Discount ${inView2 ? "Discount_border" : "Discount_border_remove"}`}
      >
        <div className="Container_header">
          <h2 style={{ color: "Red" }}>
            40% OFF Discount Coupon
            <pre>Subscribe us to get 10% OFF on all the purchases</pre>
          </h2>
        </div>
        <br />
        <div className="email-btn">
          <button className="btn-mail" onClick={() => setIsOpen(true)}>
            Email Me
          </button>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <h2>Our Mail Id</h2>
            <p>jsaibhagavanreddy@gmail.com</p>
          </Modal>
        </div>
      </div>
      <div className="Header_with_wishlist">
        <h2 className="title">Popular Shoes</h2>
        <button className="btn-wishlist" onClick={() => setOpenWishPage(true)}>
          WishList <span style={{ color: "red" }}>&#10084;</span>
        </button>
        <button className="btn-wishlist" onClick={openCartPage}>
          Cart
        </button>
      </div>
      <div className="section">
        <div
          ref={ref}
          className={`images_gallery ${inView ? "inView" : "outView"}`}
        >
          <img onClick={() => handleMouseEnter(img1, 100)} src={img1} />
          <img onClick={() => handleMouseEnter(img2, 200)} src={img2} />
          <img onClick={() => handleMouseEnter(img3, 300)} src={img3} />
          <img onClick={() => handleMouseEnter(img4, 400)} src={img4} />
          <img onClick={() => handleMouseEnter(img5, 600)} src={img5} />
        </div>
      </div>
      {cart && (
        <>
          <div ref={referForCart} className="Cart_menu">
            <div className="cart_details">
              <div className="cart_header">
                <h2 style={{ fontStyle: "bold" }}>Cart</h2>
              </div>
              <div className="cart_img">
                <img src={selectedImage} />
              </div>
              <div className="item_description">
                <h2>
                  Casual Wears For Men
                  <img
                    style={{
                      width: "20px",
                      height: "20px",
                      marginLeft: "136px",
                    }}
                    onClick={handleMouseLeave}
                    src={CloseIcon}
                  />
                </h2>
                <div className="wish-list-data">
                  <pre style={{ fontSize: "X-large" }}>{itemcost + "$"}</pre>
                  <span
                    onClick={() => AddToWishList(selectedImage)}
                    style={{
                      color: wishListImage.includes(selectedImage!)
                        ? "red"
                        : "white",
                      cursor: "pointer",
                    }}
                  >
                    &#10084;
                  </span>
                </div>
                <p style={{ color: "#7A7A7A" }}>
                  Buy good shoes and a good mattress, because when you're not in
                  one you're in the other.With four pairs of shoes,I can travel
                  the world.{" "}
                </p>
                <ul style={{ color: "#7A7A7A" }}>
                  <li>
                    <b>Colour Shown</b>: Red, White, Black
                  </li>
                  <li>
                    <b>Style:</b> SM3018-100
                  </li>
                </ul>
                <div className="checkout_btn">
                  <button
                    className="btn"
                    disabled={cartCount === 0}
                    style={{
                      cursor: cartCount === 0 ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      cartVal.current.innerText = "Add to Cart";
                      SetCount((pre) => pre - 1);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    style={{
                      width: "40px",
                      height: "30px",
                      border: "1px solid #E1E1E1",
                      textAlign: "center",
                    }}
                    value={cartCount}
                  />
                  <button
                    className="btn"
                    onClick={() => {
                      SetCount((pre) => pre + 1);
                    }}
                  >
                    +
                  </button>
                  <button
                    style={{
                      marginLeft: "145px",
                      backgroundColor: "black",
                      color: "white",
                      width: "130px",
                      height: "35px",
                    }}
                    onClick={() => Addcart(selectedImage)}
                    ref={cartVal}
                  >
                    Add to Cart
                  </button>
                </div>
                <div style={{ padding: "20px 39px 23px 14px" }}>
                  <b>Categories:</b>Clothing, Men's Clothes, Tops & T-Shirts
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <hr />
      <div className="footer">
        <div className="foot_container">
          <ul>
            <li>
              <b>Info</b>
            </li>
            <li>Details</li>
            <li>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=someone@example.com"
                target="_blank"
                rel="noreferrer"
              >
                Email
              </a>
            </li>
            <li>Privacy </li>
            <li>Shipping</li>
          </ul>
        </div>
        <div className="col2">
          <ul>
            <li>
              <b>About</b>
            </li>
            <li>Our Team</li>
            <li>Company</li>
            <li>Manufature </li>
            <li>Retail</li>
          </ul>
        </div>
        <div className="col3">
          <ul>
            <li>
              <b>Women Shoes</b>
            </li>
            <li>Our Blog</li>
            <li>Prices</li>
            <li>Details</li>
            <li>Review</li>
          </ul>
        </div>
        <div className="col4">
          <ul>
            <li>
              <b>Popular</b>
            </li>
            <li>Rate</li>
            <li>Discount</li>
            <li>Help</li>
            <li>Reviews</li>
          </ul>
        </div>
        <div className="col5">
          <ul>
            <li>
              <b>Men collection</b>
            </li>
            <li>Delivery</li>
            <li>About us</li>
            <li>Company</li>
            <li>Reviews</li>
          </ul>
        </div>
        <div className="col6">
          <ul>
            <li>
              <b>Get in touch</b>
            </li>
            <li>Stylish Online Store 123 Main Street </li>
            <li>
              <a href="https://www.linkedin.com/">Linkden</a>{" "}
            </li>
            <li>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=someone@example.com"
                target="_blank"
                rel="noreferrer"
              >
                Email
              </a>
            </li>
            <li>
              <a href="tel:9652866855">9652866855</a>
            </li>
          </ul>
        </div>
      </div>
      <div ref={login} className="Login_modal">
        <div ref={des} className="Description">
          {rotate ? (
            <>
              <div className="Data-logout">
                <h2 ref={header} style={{ marginLeft: "150px", color: "red" }}>
                  Login
                </h2>
                <img
                  src={CloseIcon}
                  onClick={CloseModal}
                  style={{
                    width: "20px",
                    marginTop: "22px",
                    marginLeft: "144px",
                    height: "20px",
                    backgroundColor: "red",
                  }}
                />
              </div>
              <div ref={hide_for_forget}>
                <div className="Input_details">
                  <input
                    type="email"
                    value={Username}
                    ref={username}
                    style={{ color: "#7A7A7A" }}
                    placeholder="Username or Email Address *"
                    onChange={(e) => Setusername(e.target.value)}
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => Setpassword(e.target.value)}
                    value={password}
                  />
                  <br />
                </div>
                <div className="forgot-password">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRemember(checked);
                    }}
                  />{" "}
                  <p>Remember Me</p>
                  <button
                    type="button"
                    onClick={forget_password}
                    style={{
                      marginLeft: "75px",
                      marginTop: "10px",
                      background: "none",
                      border: "none",
                      color: "#0d6efd",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    Login with Otp?
                  </button>{" "}
                </div>
                <div className="btn-login">
                  <button onClick={Credentials}>Login</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="forgot_password">
                <div className="content">
                  <Forget
                    login={login}
                    login_link={login_link}
                    logout_header={logout_header}
                    setRotate={setRotate}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {process && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={100} />
        </div>
      )}

      <Register toOpen={registerModal} toClose={() => setregisterModal(false)}>
        <Registermodal
          toClose={() => setregisterModal(false)}
          setProcess={setProcess}
        />
      </Register>
      <LikedPage toOpen={openPage} toClose={() => setOpenWishPage(false)}>
        <div className="wishList-main">
          <h1 className="Header">Wish List</h1>
          <img
            className="close-wish"
            src={CloseIcon}
            onClick={() => {
              setOpenWishPage(false);
            }}
          />
        </div>
        <div className="wishList_table">
          <table border={1}>
            <thead>
              <tr>
                <th>Item Number</th>
                <th>Item Details</th>
                <th style={{ width: "200px" }}>Remove From WishList</th>
              </tr>
            </thead>

            <tbody>
              {wishListImage.map((img, index): any => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td className="wishlist-image">
                    <img src={img} alt="wishlist" width="100" />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {wishListImage.length === 0 && (
          <>
            <div className="empty_wishlist">
              <span>Empty</span>
            </div>
          </>
        )}
      </LikedPage>
      <Cartmodal toOpen={cart_item} toClose={() => setCartModal(false)}>
        <div className="cart_item_main">
          <div className="wishList-main">
            <h1 className="Header">Cart List</h1>
            <img
              className="close-wish"
              src={CloseIcon}
              onClick={() => setCartModal(false)}
            />
          </div>
          <div className="wishList_table">
            <table border={1} style={{ borderColor: "wheat" }}>
              <thead>
                <tr>
                  <th>SelectItem</th>
                  <th>Item Number</th>
                  <th>Item Details</th>
                  <th>Quality</th>
                  <th>Cost</th>

                  <th style={{ width: "200px" }}>Remove From WishList</th>
                </tr>
              </thead>
              <tbody>
                {cartImage.map((img, index) => (
                  <tr key={index}>
                    <td>
                      <div className="selectedItem">
                        <input
                          type="checkbox"
                          checked={checkedItems.includes(img.id)}
                          onChange={(e) => {
                            const checked = e.target.checked;

                            setCheckedItems((prev) =>
                              checked
                                ? [...prev, img.id]
                                : prev.filter((id) => id !== img.id),
                            );

                            totalValue(img.val, img.value, checked, img.id);
                          }}
                        />
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td className="wishlist-image">
                      <img src={img.image} alt="wishlist" width="100" />
                    </td>
                    <td style={{ textAlign: "center" }}>{img.value}</td>
                    <td style={{ textAlign: "center" }}>{img.val}</td>

                    <td style={{ textAlign: "center" }}>
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {true ? (
              <>
                <div className="itemforcart">
                  <div className="priceHeader">
                    <pre>Total Price</pre>
                    <span>
                      $<span>{total}</span>
                    </span>
                  </div>
                </div>
                <div className="check-out-btn">
                  <button className="btn-mail">Checkout</button>{" "}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Cartmodal>
    </>
  );
}

export default HomePage;
