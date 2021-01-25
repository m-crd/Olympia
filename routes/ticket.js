const express = require("express");
const router = express.Router();

const Ticket = require("../models/Ticket");
const Event = require("../models/Event");

router.post("/tickets/book", async (req, res) => {
  try {
    const { eventId, mail, username, category, seats } = req.fields;

    if (
      typeof seats !== "number" ||
      seats > 4 ||
      seats < 1 ||
      (category !== "orchestre" && category !== "mezzanine")
    ) {
      res.status(400).json({ message: "Invalid Request" });
    } else {
      // On cherche l'event en fonction de son id
      const event = await Event.findById(eventId);
      //   console.log(event);
      // Regarder s'il reste assez de places
      if (event.seats[category] >= seats) {
        // on peut réserver
        event.seats[category] -= seats;
        await event.save();

        // Si oui, on crée le ticket
        const ticket = new Ticket({
          mail: mail,
          username: username,
          date: event.date,
          category: category,
          seats: seats,
          event: eventId,
        });

        await ticket.save();

        res.status(200).json({
          message: `${seats} seat(s) successfully booked`,
        });
      } else {
        res.status(400).json({ message: "Not enough seats available" });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/tickets", async (req, res) => {
  try {
    const mail = req.fields.mail;
    const tickets = await Ticket.find({ mail: mail }).populate("event");
    // console.log(tickets);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
module.exports = router;
