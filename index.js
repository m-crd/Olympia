const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());

// Import des routes
const eventRoutes = require("./routes/event");
app.use(eventRoutes);
const ticketRoutes = require("./routes/ticket");
app.use(ticketRoutes);

mongoose.connect("mongodb://localhost/olympia-phoenix", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas" });
});

app.listen(3000, () => {
  console.log("Server Started");
});
