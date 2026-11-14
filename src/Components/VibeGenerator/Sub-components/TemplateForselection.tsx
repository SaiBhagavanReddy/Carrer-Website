import "../Vibe.css";
import biryani from "../../Assests/Golden Chicken Biryani Bowl.png";
import burger from "../../Assests/Gourmet Cheeseburger with Pastel Accents.png";
import Pasta from "../../Assests/Creamy Tomato Basil Penne Pasta.png";
import Sushi_Platte from "../../Assests/Modern Sushi Platter on Slate.png";
import purple from "../../Assests/Glossy Purple Orb with Floating Bubbles.png";
import Pink from "../../Assests/Glossy Pink Orb and Liquid Ribbon.png";
import blue from "../../Assests/Glossy Blue Orb with Swirling Ribbons.png";
import emp from "../../Assests/Glossy Emerald Orb with Leafy Swirls.png";
import HiNanna from "../../Assests/Hi Nanna_ Golden Family Moments.png";
import Pushpa from "../../Assests/Pushpa_ The Rise — Forest Rebel.png";
import SR from "../../Assests/Sita Ramam_ A Vintage Romance.png";
import RRR from "../../Assests/RRR_ Fire and Water United.png";
import Sunset from "../../Assests/Historic Cities at Sunset.png";
import SeaofClouds from "../../Assests/Solitary Hiker Above the Sea of Clouds.png";
import Hike from "../../Assests/Hiker Overlooking a Misty Mountain Sunrise.png";
import Historic from "../../Assests/Historic Cities at Sunset.png";
import ChannaMerya from "../../Assests/Channa Mereya_ Sunset Solitude.png";
import InkemKavala from "../../Assests/Golden Hour Romance_ Inkem Inkem Kaavaale.png";
import Golden from "../../Assests/Golden-Hour Romance Overlook.png";
import SunsetSong from "../../Assests/Romantic Sunset Acoustic Session.png";
import { useContext } from "react";
import { Store } from "./ContextApi";
interface Props {
  vibeSwitch: "Food" | "Colour" | "Movie" | "Destination" | "Song";
}
interface Item {
  itemNo: number;
  imgsrc: string;
  title: string;
}

const TemplateSelection = ({ vibeSwitch }: Props) => {
  const Fooditems: Item[] = [
    { itemNo: 1, imgsrc: biryani, title: "biryani" },
    { itemNo: 2, imgsrc: burger, title: "burger" },
    { itemNo: 3, imgsrc: Pasta, title: "Pasta" },
    { itemNo: 4, imgsrc: Sushi_Platte, title: "Sushi_Platte" },
  ];

  const Colour: Item[] = [
    { itemNo: 1, imgsrc: purple, title: "purple" },
    { itemNo: 2, imgsrc: Pink, title: "Pink" },
    { itemNo: 3, imgsrc: blue, title: "blue" },
    { itemNo: 4, imgsrc: emp, title: "emp" },
  ];
  const Movie: Item[] = [
    { itemNo: 1, imgsrc: HiNanna, title: "HiNanna" },
    { itemNo: 2, imgsrc: Pushpa, title: "Pushpa" },
    { itemNo: 3, imgsrc: RRR, title: "RRR" },
    { itemNo: 4, imgsrc: SR, title: "SiteRam" },
  ];
  const Destination: Item[] = [
    { itemNo: 1, imgsrc: Sunset, title: "Sunset" },
    { itemNo: 2, imgsrc: SeaofClouds, title: "SeaofClouds" },
    { itemNo: 3, imgsrc: Hike, title: "Hike" },
    { itemNo: 4, imgsrc: Historic, title: "Historic" },
  ];

  const Song: Item[] = [
    { itemNo: 1, imgsrc: ChannaMerya, title: "ChannaMerya" },
    { itemNo: 2, imgsrc: InkemKavala, title: "InkemKavala" },
    { itemNo: 3, imgsrc: Golden, title: "Golden" },
    { itemNo: 4, imgsrc: SunsetSong, title: "SunsetSong" },
  ];

  const allItems: Record<string, Item[]> = {
    Food: Fooditems,
    Colour: Colour,
    Movie: Movie,
    Destination: Destination,
    Song: Song,
  };
  const items = allItems[vibeSwitch] ?? [];
  const con = useContext(Store);
  if (!con) {
    throw new Error("Component must be wrapped inside ContextApiForStoring");
  }
  const { userData, setuserData } = con;
  const setStore = (src: string) => {
    setuserData((prev) => ({
      ...prev,
      [vibeSwitch]: src,
    }));
  };

  return (
    <div>
      <header className="header-section-vibe">
        <div className="step-count">
          <span>Step 1 of 6</span>
        </div>

        <h2>
          What's your{" "}
          <span style={{ color: "blue" }}>Favorite {vibeSwitch}?</span>
        </h2>
      </header>
      <div className={`image-with-text ${vibeSwitch.toLowerCase()}`}>
        {items.map((data) => (
          <div key={data.itemNo} className="img-with-checkbox">
            <img src={data.imgsrc} alt={data.title} />
            <div className="checkbox">
              <input
                type="checkbox"
                checked={userData[vibeSwitch] === data.title}
                onChange={(e) => {
                  if (e.target.checked) {
                    setStore(data.title);
                  } else {
                    setStore("");
                  }
                }}
              />
            </div>
            <pre>{data.title}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;
