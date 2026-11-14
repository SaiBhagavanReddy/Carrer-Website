import "../../HotelManagement/Css/Home.css";
import NavigationBar from "../Components/NavigationBar";
import FoodHeader from "../../../../src/assets/FoodHeader.png";
const Home = () => {
  return (
    <>
      <div className="HomeMain">
        <div className="Nav">
          <NavigationBar />
        </div>
        <div className="Home-Section-header">
          <div className="image-with-Text">
            <div className="img">
              <img src={FoodHeader} alt="HeaderImage" />
            </div>
            <div className="Headertext">
              <h2>
                Good <span style={{ color: "orange" }}>Food,</span> <br/>
                Magic <span style={{ color: "orange" }}> Mood!</span>
              </h2>
              <p>
                Discovering mouth watering dishes with love with <br />
                finest incrediants{" "}
              </p>
              <div className="explore-btn">
                <button>
                  Explore <span style={{ marginLeft: "20px" }}>{">"}</span>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
     
      </div>
         <div className="Dish-section">
          <div className="headerForDish">
          <h3>
            Popular Dishes
          </h3>
          </div>
          <div>
            <button>View All</button>
          </div>
        </div>
    </>
  );
};
export default Home;
