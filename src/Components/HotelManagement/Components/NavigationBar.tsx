import { Link } from "react-router-dom";
import "../Css/Home.css";
import { ShoppingCart } from "lucide-react";

const NavigationBar = () => {
  return (
    <>
      <div className="NavBar">
        <div className="icon">
          <h2>SplFoodie</h2>
        </div>
        <div className="links">
          <nav>
            <Link to="/">Home</Link>
            <Link to="Menu">Menu</Link>
            <Link to="about">About</Link>
            <Link to="order">Order</Link>
             <div>
            <ShoppingCart style={{ color: "wheat" }} />
          </div>
          </nav>
         
        </div>
      </div>
    </>
  );
};
export default NavigationBar;
