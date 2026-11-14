import { useState } from "react";
import "../../Css/BloodAvailability.css";
const Blood_Availability = () => {
  const [numberofRows, setnumberofRows] = useState(1);
  const [userLocation, setuserLocation] = useState("");
  const [userRadius, setRadius] = useState(0);
  const bloodBanks = [
    {
      id: 1,
      name: "Red Cross Blood Bank",
      location: "Madhapur, Hyderabad",
      distance: "2.3 km",
      availableUnits: 56,
      contact: "9876543210",
    },
    {
      id: 2,
      name: "LifeCare Blood Center",
      location: "Banjara Hills, Hyderabad",
      distance: "3.1 km",
      availableUnits: 42,
      contact: "9123456780",
    },
    {
      id: 3,
      name: "City Care Blood Bank",
      location: "Ameerpet, Hyderabad",
      distance: "4.7 km",
      availableUnits: 38,
      contact: "9988776655",
    },
    {
      id: 4,
      name: "Helping Hands Blood Bank",
      location: "Kukatpally, Hyderabad",
      distance: "6.2 km",
      availableUnits: 27,
      contact: "9034567890",
    },
    {
      id: 5,
      name: "Hope Blood Center",
      location: "Dilsukhnagar, Hyderabad",
      distance: "7.5 km",
      availableUnits: 31,
      contact: "9156784321",
    },
    {
      id: 6,
      name: "Apollo Blood Bank",
      location: "Jubilee Hills, Hyderabad",
      distance: "5.4 km",
      availableUnits: 64,
      contact: "9012345678",
    },
    {
      id: 7,
      name: "Care Blood Center",
      location: "Hitech City, Hyderabad",
      distance: "4.2 km",
      availableUnits: 49,
      contact: "9345678901",
    },
    {
      id: 8,
      name: "Life Saver Blood Bank",
      location: "Secunderabad, Hyderabad",
      distance: "8.1 km",
      availableUnits: 35,
      contact: "9456789012",
    },
    {
      id: 9,
      name: "Mother Teresa Blood Bank",
      location: "Mehdipatnam, Hyderabad",
      distance: "6.8 km",
      availableUnits: 29,
      contact: "9567890123",
    },
    {
      id: 10,
      name: "Sanjeevani Blood Center",
      location: "Begumpet, Hyderabad",
      distance: "3.8 km",
      availableUnits: 45,
      contact: "9678901234",
    },
    {
      id: 11,
      name: "Life Line Blood Bank",
      location: "Kondapur, Hyderabad",
      distance: "5.1 km",
      availableUnits: 52,
      contact: "9789012345",
    },
    {
      id: 12,
      name: "Hope Care Blood Bank",
      location: "Manikonda, Hyderabad",
      distance: "7.2 km",
      availableUnits: 33,
      contact: "9890123456",
    },
    {
      id: 13,
      name: "NTR Blood Bank",
      location: "Lakdikapul, Hyderabad",
      distance: "4.9 km",
      availableUnits: 41,
      contact: "9901234567",
    },
    {
      id: 14,
      name: "Saviour Blood Center",
      location: "Tolichowki, Hyderabad",
      distance: "6.5 km",
      availableUnits: 24,
      contact: "9013456789",
    },
    {
      id: 15,
      name: "Good Life Blood Bank",
      location: "Uppal, Hyderabad",
      distance: "9.3 km",
      availableUnits: 37,
      contact: "9124567890",
    },
    {
      id: 16,
      name: "Aarogya Blood Center",
      location: "Kachiguda, Hyderabad",
      distance: "5.7 km",
      availableUnits: 48,
      contact: "9235678901",
    },
    {
      id: 17,
      name: "United Blood Bank",
      location: "Tarnaka, Hyderabad",
      distance: "7.9 km",
      availableUnits: 30,
      contact: "9346789012",
    },
    {
      id: 18,
      name: "CarePlus Blood Bank",
      location: "LB Nagar, Hyderabad",
      distance: "10.2 km",
      availableUnits: 43,
      contact: "9457890123",
    },
    {
      id: 19,
      name: "Sai Blood Center",
      location: "Miyapur, Hyderabad",
      distance: "8.6 km",
      availableUnits: 36,
      contact: "9568901234",
    },
    {
      id: 20,
      name: "Jeevan Jyothi Blood Bank",
      location: "Attapur, Hyderabad",
      distance: "7.1 km",
      availableUnits: 28,
      contact: "9679012345",
    },
  ];
  const noRows = 5;
  const FilterData = bloodBanks.filter(
    (Location) =>
      Location.location.toLowerCase().includes(userLocation.toLowerCase()) &&
      (userRadius === 0 || parseFloat(Location.distance) <= userRadius),
  );

  const startindex = (numberofRows - 1) * noRows;
  const endIndex = startindex + noRows;

  const displayData = FilterData.slice(startindex, endIndex);

  const totalPages = Math.ceil(FilterData.length / noRows);
  return (
    <>
      <div className="BloodAvailabilityMain">
        <div className="BloodAvailabilityHeader">
          <h2>Blood Availability</h2>
          <pre>Search and find available blood units</pre>
        </div>
        <div className="BloodAvailabilitySearchFilter">
          <div className="BloodAvailabilitySearch">
            <label className="BloodAvailabilitySearchLabel">
              Location
              <input
                type="text"
                value={userLocation}
                onChange={(e) => setuserLocation(e.target.value)}
                placeholder="Search by Location name"
              />
            </label>
            <label className="BloodAvailabilitySearchLabel">
              <select
                value={userRadius}
                onChange={(e) => setRadius(Number(e.target.value))}
              >
                <option value="">Select Radius</option>
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="25">25 km</option>
                <option value="50">50 km</option>
                <option value="100">100 km</option>
              </select>
            </label>
            <label className="BloodAvailabilitySearchLabel">
              Blood Group
              <select></select>
            </label>
          </div>
        </div>
        <div className="BloodRequestBlanks">
          <table border={1}>
            <thead>
              <tr>
                <th>id</th>

                <th>Name</th>

                <th>Location</th>

                <th> availbility</th>
                <th> availableUnits </th>

                <th> contact </th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((bank) => (
                <tr key={bank.id}>
                  <td>{bank.id}</td>
                  <td>{bank.name}</td>
                  <td>{bank.location}</td>
                  <td>{bank.distance}</td>
                  <td>{bank.availableUnits}</td>
                  <td>{bank.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="Navigation-btn">
            <button
              onClick={() => setnumberofRows((prev) => prev - 1)}
              disabled={numberofRows === 1}
            >
              {"<"}
            </button>

            <button
              onClick={() => setnumberofRows((prev) => prev + 1)}
              disabled={numberofRows === totalPages}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blood_Availability;
