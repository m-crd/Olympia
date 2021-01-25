const express = require("express");
const router = express.Router();

// Import des models
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

router.post("/events/create", async (req, res) => {
  try {
    // const name = req.fields.name
    // const date = req.fields.date

    // Destructuring
    // Extrait les clé name et date de l'objet req.fields
    const { name, date } = req.fields;

    const newEvent = new Event({
      name: name,
      date: date,
      seats: {
        orchestre: 1164,
        mezzanine: 824,
      },
    });

    await newEvent.save();
    res.status(200).json({
      message: "Event successfully created",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/events/availabilities", async (req, res) => {
  try {
    const date = req.query.date;

    const events = await Event.find({ date: date });

    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/events", async (req, res) => {
  const id = req.query.id;

  try {
    const event = await Event.findById(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
