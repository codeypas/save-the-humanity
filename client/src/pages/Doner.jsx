import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 

const Donor = ({ donorId }) => {
  // If donorId is not passed as a prop, try fetching it from route params
  const params = useParams();
  const id = donorId || params.donorId;

  const [donor, setDonor] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [distanceInfo, setDistanceInfo] = useState(null);
  const [foodDetails, setFoodDetails] = useState("");

  useEffect(() => {
    const fetchDonor = async () => {
      if (!id) {
        console.error("Donor ID is missing!");
        return;
      }
      try {
        console.log(`Fetching donor details for ID: ${id}`);
        const response = await axios.get(
          `http://localhost:3000/api/donor/profile/${id}`
        );
        setDonor(response.data);
      } catch (err) {
        console.error("Error fetching donor details:", err);
      }
    };
    fetchDonor();
  }, [id]);

  const calculateDistance = async () => {
    if (!recipientAddress || !donor?.address) {
      alert("Both donor and recipient addresses are required.");
      return;
    }
    try {
      console.log(
        `Calculating distance from ${donor.address} to ${recipientAddress}`
      );
      const response = await axios.post(
        "http://localhost:3000/api/donor/calculate-distance",
        {
          donorAddress: donor.address,
          recipientAddress,
        }
      );
      setDistanceInfo(response.data);
    } catch (err) {
      console.error("Error calculating distance:", err);
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!foodDetails) {
      alert("Please provide food details before submitting.");
      return;
    }
    try {
      console.log("Updating donor with new food details:", foodDetails);
      const updatedDonor = { ...donor, foodDetails };
      await axios.post("http://localhost:3000/api/donor/add-donor", updatedDonor);
      alert("Donation details updated!");
    } catch (err) {
      console.error("Error submitting donation:", err);
    }
  };

  if (!id) return <p>Error: Donor ID is missing.</p>;
  if (!donor) return <p>Loading donor details...</p>;

  return (
    <div>
      <h1>Welcome, {donor.name}</h1>
      <p>Email: {donor.email}</p>
      <p>Phone: {donor.phone}</p>
      <p>Address: {donor.address}</p>

      <form onSubmit={handleDonate}>
        <label>Food Details:</label>
        <textarea
          value={foodDetails}
          onChange={(e) => setFoodDetails(e.target.value)}
          required
        ></textarea>
        <button type="submit">Update Donation</button>
      </form>

      <h2>Calculate Distance</h2>
      <input
        type="text"
        placeholder="Enter recipient address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        required
      />
      <button onClick={calculateDistance}>Get Distance</button>

      {distanceInfo && (
        <div>
          <p>Distance: {distanceInfo.distance}</p>
          <p>Duration: {distanceInfo.duration}</p>
        </div>
      )}
    </div>
  );
};

export default Donor;
