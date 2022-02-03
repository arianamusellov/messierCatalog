const express = require('express');
const cors = require('cors');
const path = require('path');
const postgres = require('postgres');

const sql = postgres('postgres://otqccsks:ABQGbK-q3WiQiL76cO3ZcKNQs5p69LUp@castor.db.elephantsql.com/otqccsks');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/api", async (_, res) => {
  const response = await sql`select * from messier_objects`;
  res.json(response).status(200);
});

// Handle React routing, return all requests to React app
app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
