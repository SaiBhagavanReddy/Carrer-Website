import { useState } from "react";
import "../../Css/MyBloodDonation.css";

const MyBloodDonation = () => {
  // Current step
  const [MovingNext, setMovingNext] = useState("PersonalDetails");

  // Donor data
  const [donorData, setDonorData] = useState({
    fullName: "",
    gender: "",
    age: "",
    email: "",
    bloodGroup: "",
    location: "",
    weight: "",
    height: "",
    chronicIllness: "",
    allergies: "",
    medication: "",
    donatedBefore: "",
    availableDate: "",
    lastDonationDate: "",
  });

  // Steps
  const steps = [
    {
      id: "PersonalDetails",
      number: 1,
      label: "Personal Details",
    },
    {
      id: "HealthDetails",
      number: 2,
      label: "Health Details",
    },
    {
      id: "Availability",
      number: 3,
      label: "Availability",
    },
    {
      id: "Review",
      number: 4,
      label: "Review",
    },
  ];

  // Find current step index
  const currentStep = steps.findIndex(
    (step) => step.id === MovingNext
  );

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDonorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Go to next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setMovingNext(steps[currentStep + 1].id);
    }
  };

  // Go to previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setMovingNext(steps[currentStep - 1].id);
    }
  };

  // Cancel
  const handleCancel = () => {
    setDonorData({
      fullName: "",
      gender: "",
      age: "",
      email: "",
      bloodGroup: "",
      location: "",
      weight: "",
      height: "",
      chronicIllness: "",
      allergies: "",
      medication: "",
      donatedBefore: "",
      availableDate: "",
      lastDonationDate: "",
    });

    setMovingNext("PersonalDetails");
  };

  // Donate Blood
  const handleDonateBlood = () => {
    console.log("Donor Data:", donorData);

    alert("Blood donation request submitted successfully!");

    handleCancel();
  };

  return (
    <div className="blood-donation-page">

      {/* Header */}
      <div className="donation-header">
        <h1>Blood Donation</h1>
        <p>
          Become a donor and help save someone's life
        </p>
      </div>

      {/* Step Navigation */}
      <div className="Details-navigation">

        {steps.map((step, index) => (
          <div
            key={step.id}
            className={
              index <= currentStep
                ? "step active"
                : "step"
            }
            onClick={() => {
              // Allow clicking only previous/current steps
              if (index <= currentStep) {
                setMovingNext(step.id);
              }
            }}
          >

            {/* Number */}
            <div className="step-number">
              {step.number}
            </div>

            {/* Label */}
            <span>{step.label}</span>

          </div>
        ))}

      </div>

      {/* Main Form */}
      <div className="donation-container">

        {/* ================= PERSONAL DETAILS ================= */}

        {MovingNext === "PersonalDetails" && (
          <div className="donation-form">

            <h2>Personal Details</h2>

            <p className="form-description">
              Please provide your basic personal information.
            </p>

            {/* Full Name */}
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={donorData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label>Gender</label>

              <select
                name="gender"
                value={donorData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Age */}
            <div className="form-group">
              <label>Age</label>

              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                value={donorData.age}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={donorData.email}
                onChange={handleChange}
              />
            </div>

            {/* Blood Group */}
            <div className="form-group">
              <label>Blood Group</label>

              <select
                name="bloodGroup"
                value={donorData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Location */}
            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                placeholder="Enter your location"
                value={donorData.location}
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="form-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="next-btn"
                onClick={handleNext}
              >
                Next
              </button>

            </div>

          </div>
        )}

        {/* ================= HEALTH DETAILS ================= */}

        {MovingNext === "HealthDetails" && (
          <div className="donation-form">

            <h2>Health Information</h2>

            <p className="form-description">
              Please provide your current health information.
            </p>

            {/* Weight */}
            <div className="form-group">
              <label>Weight (kg)</label>

              <input
                type="number"
                name="weight"
                placeholder="Enter your weight"
                value={donorData.weight}
                onChange={handleChange}
              />
            </div>

            {/* Height */}
            <div className="form-group">
              <label>Height (cm)</label>

              <input
                type="number"
                name="height"
                placeholder="Enter your height"
                value={donorData.height}
                onChange={handleChange}
              />
            </div>

            {/* Chronic Illness */}
            <div className="form-group">
              <label>Do you have any chronic illness?</label>

              <select
                name="chronicIllness"
                value={donorData.chronicIllness}
                onChange={handleChange}
              >
                <option value="">
                  Select an option
                </option>

                <option value="No">
                  No
                </option>

                <option value="Yes">
                  Yes
                </option>
              </select>
            </div>

            {/* Allergies */}
            <div className="form-group">
              <label>Do you have any allergies?</label>

              <select
                name="allergies"
                value={donorData.allergies}
                onChange={handleChange}
              >
                <option value="">
                  Select an option
                </option>

                <option value="No">
                  No
                </option>

                <option value="Yes">
                  Yes
                </option>
              </select>
            </div>

            {/* Medication */}
            <div className="form-group">
              <label>
                Are you currently taking any medication?
              </label>

              <select
                name="medication"
                value={donorData.medication}
                onChange={handleChange}
              >
                <option value="">
                  Select an option
                </option>

                <option value="No">
                  No
                </option>

                <option value="Yes">
                  Yes
                </option>
              </select>
            </div>

            {/* Buttons */}
            <div className="form-buttons">

              <button
                type="button"
                className="back-btn"
                onClick={handleBack}
              >
                Back
              </button>

              <button
                type="button"
                className="next-btn"
                onClick={handleNext}
              >
                Next
              </button>

            </div>

          </div>
        )}

        {/* ================= AVAILABILITY ================= */}

        {MovingNext === "Availability" && (
          <div className="donation-form">

            <h2>Availability</h2>

            <p className="form-description">
              Tell us about your donation availability.
            </p>

            {/* Donated Before */}
            <div className="form-group">
              <label>
                Have you donated blood before?
              </label>

              <select
                name="donatedBefore"
                value={donorData.donatedBefore}
                onChange={handleChange}
              >
                <option value="">
                  Select an option
                </option>

                <option value="Yes">
                  Yes
                </option>

                <option value="No">
                  No
                </option>
              </select>
            </div>

            {/* Last Donation Date */}
            <div className="form-group">
              <label>
                Last Donation Date
              </label>

              <input
                type="date"
                name="lastDonationDate"
                value={donorData.lastDonationDate}
                onChange={handleChange}
              />
            </div>

            {/* Available Date */}
            <div className="form-group">
              <label>
                Available Donation Date
              </label>

              <input
                type="date"
                name="availableDate"
                value={donorData.availableDate}
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="form-buttons">

              <button
                type="button"
                className="back-btn"
                onClick={handleBack}
              >
                Back
              </button>

              <button
                type="button"
                className="next-btn"
                onClick={handleNext}
              >
                Next
              </button>

            </div>

          </div>
        )}

        {/* ================= REVIEW ================= */}

        {MovingNext === "Review" && (
          <div className="donation-form">

            <h2>Review Details</h2>

            <p className="form-description">
              Please review your information before submitting.
            </p>

            <div className="review-section">

              <h3>Personal Details</h3>

              <p>
                <strong>Full Name:</strong>{" "}
                {donorData.fullName}
              </p>

              <p>
                <strong>Gender:</strong>{" "}
                {donorData.gender}
              </p>

              <p>
                <strong>Age:</strong>{" "}
                {donorData.age}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {donorData.email}
              </p>

              <p>
                <strong>Blood Group:</strong>{" "}
                {donorData.bloodGroup}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {donorData.location}
              </p>

            </div>

            <div className="review-section">

              <h3>Health Information</h3>

              <p>
                <strong>Weight:</strong>{" "}
                {donorData.weight} kg
              </p>

              <p>
                <strong>Height:</strong>{" "}
                {donorData.height} cm
              </p>

              <p>
                <strong>Chronic Illness:</strong>{" "}
                {donorData.chronicIllness}
              </p>

              <p>
                <strong>Allergies:</strong>{" "}
                {donorData.allergies}
              </p>

              <p>
                <strong>Medication:</strong>{" "}
                {donorData.medication}
              </p>

            </div>

            <div className="review-section">

              <h3>Availability</h3>

              <p>
                <strong>Donated Before:</strong>{" "}
                {donorData.donatedBefore}
              </p>

              <p>
                <strong>Last Donation Date:</strong>{" "}
                {donorData.lastDonationDate}
              </p>

              <p>
                <strong>Available Date:</strong>{" "}
                {donorData.availableDate}
              </p>

            </div>

            {/* Buttons */}
            <div className="form-buttons">

              <button
                type="button"
                className="back-btn"
                onClick={handleBack}
              >
                Back
              </button>

              <button
                type="button"
                className="donate-btn"
                onClick={handleDonateBlood}
              >
                Donate Blood
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default MyBloodDonation;