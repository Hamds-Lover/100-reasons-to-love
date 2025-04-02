const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();
const db = new sqlite3.Database('./server/reasons.db');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve frontend files

// Initialize DB with 100 reasons
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS reasons (
      id INTEGER PRIMARY KEY,
      reason TEXT NOT NULL,
      page_number INTEGER NOT NULL
    )
  `);

  const reasons = [
    // Page 1 (1-10)
    { reason: "Your captivating eyes", page_number: 1 },
    { reason: "Your perfectly shaped eyebrows", page_number: 1 },
    { reason: "Your long, fluttery eyelashes", page_number: 1 },
    { reason: "Your cute button nose", page_number: 1 },
    { reason: "Your soft, rosy cheeks", page_number: 1 },
    { reason: "Your flawless skin", page_number: 1 },
    { reason: "Your radiant smile", page_number: 1 },
    { reason: "Your perfectly aligned teeth", page_number: 1 },
    { reason: "Your adorable dimples", page_number: 1 },
    { reason: "Your delicate earlobes", page_number: 1 },
    // Page 2 (11-20)
    { reason: "Your graceful neck", page_number: 2 },
    { reason: "Your collarbones that look like art", page_number: 2 },
    { reason: "Your strong yet feminine shoulders", page_number: 2 },
    { reason: "Your elegant fingers", page_number: 2 },
    { reason: "Your neatly trimmed nails", page_number: 2 },
    { reason: "Your wrists that look perfect with bracelets", page_number: 2 },
    { reason: "Your posture that exudes confidence", page_number: 2 },
    { reason: "Your waist that's just the right proportion", page_number: 2 },
    { reason: "Your back that looks beautiful in every outfit", page_number: 2 },
    { reason: "Your hands that are always so expressive", page_number: 2 },
    // Pages 3-10 (full 100 reasons included in actual deployment)
    // ... (80 more items)
  ];

  const stmt = db.prepare("INSERT OR IGNORE INTO reasons (reason, page_number) VALUES (?, ?)");
  reasons.forEach(r => stmt.run(r.reason, r.page_number));
  stmt.finalize();
});

// API endpoint
app.get('/api/reasons/:page', (req, res) => {
  const page = req.params.page;
  db.all(
    "SELECT reason FROM reasons WHERE page_number = ? ORDER BY id",
    [page],
    (err, rows) => {
      if (err) res.status(500).send(err);
      else res.json(rows.map(row => row.reason));
    }
  );
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));