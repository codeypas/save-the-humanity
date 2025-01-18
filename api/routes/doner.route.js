
const express = require("express");
const axios = require("axios");
const Donor = require("./models/Donor");
const router = express.Router();
require("dotenv").config();

// Create a new donor
router.post("/add-donor", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get donor details
router.get("/profile/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.status(200).json(donor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Calculate distance using Google Maps API
router.post("/calculate-distance", async (req, res) => {
  const { donorAddress, recipientAddress } = req.body;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        donorAddress
      )}&destinations=${encodeURIComponent(
        recipientAddress
      )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    const data = response.data.rows[0].elements[0];
    res.status(200).json({
      distance: data.distance.text,
      duration: data.duration.text,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate distance" });
  }
});

module.exports = router;
