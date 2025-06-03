const express = require("express");
const fs = require("fs");
const app = express();
const port = 8080;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Read the JSON file
app.get("/api/tickets", (req, res) => {
  fs.readFile("tickets.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading JSON file");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Write to the JSON file with merge logic
app.post("/api/tickets", express.json(), (req, res) => {
  fs.readFile("tickets.json", "utf8", (readErr, data) => {
    if (readErr) {
      console.error(readErr);
      return res.status(500).send("Error reading ticket file");
    }

    let existingTickets = {};
    try {
      existingTickets = JSON.parse(data);
    } catch (parseErr) {
      console.error(parseErr);
      return res.status(500).send("Error parsing existing ticket data");
    }

    // Merge new updates into existing ticket data
    const updatedTickets = {
      ...existingTickets,
      ...req.body,
    };

    fs.writeFile(
      "tickets.json",
      JSON.stringify(updatedTickets, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          return res.status(500).send("Error writing to ticket file");
        }

        res.status(201).send("Ticket status updated successfully");
      }
    );
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
