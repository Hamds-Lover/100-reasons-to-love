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
  // Page 1 (1-10) - Facial Features
  { reason: "The way your eyes sparkle when you laugh", page_number: 1 },
  { reason: "Your perfectly arched eyebrows", page_number: 1 },
  { reason: "Your long eyelashes that frame your eyes", page_number: 1 },
  { reason: "Your cute nose that wrinkles when you smile", page_number: 1 },
  { reason: "Your soft cheeks that glow in sunlight", page_number: 1 },
  { reason: "Your flawless skin that feels like silk", page_number: 1 },
  { reason: "Your smile that brightens my darkest days", page_number: 1 },
  { reason: "Your teeth that shine like pearls", page_number: 1 },
  { reason: "Your dimples that appear when you're mischievous", page_number: 1 },
  { reason: "Your earlobes that are so delicate", page_number: 1 },

  // Page 2 (11-20) - Upper Body
  { reason: "Your graceful neck that turns elegantly", page_number: 2 },
  { reason: "Your collarbones that look sculpted", page_number: 2 },
  { reason: "Your shoulders that carry strength gracefully", page_number: 2 },
  { reason: "Your fingers that move with such precision", page_number: 2 },
  { reason: "Your nails that are always perfectly shaped", page_number: 2 },
  { reason: "Your wrists that look fragile but are so strong", page_number: 2 },
  { reason: "Your posture that commands respect", page_number: 2 },
  { reason: "Your waist that curves just right", page_number: 2 },
  { reason: "Your back that looks regal in every outfit", page_number: 2 },
  { reason: "Your hands that create magic effortlessly", page_number: 2 },

  // Page 3 (21-30) - Personality & Expressions
  { reason: "Your laugh that sounds like wind chimes", page_number: 3 },
  { reason: "Your voice that calms storms in my mind", page_number: 3 },
  { reason: "Your intelligence that leaves me in awe", page_number: 3 },
  { reason: "Your creativity that turns ordinary into art", page_number: 3 },
  { reason: "Your determination to overcome challenges", page_number: 3 },
  { reason: "Your resilience that inspires everyone", page_number: 3 },
  { reason: "Your warmth that makes strangers feel loved", page_number: 3 },
  { reason: "Your passion for learning new things", page_number: 3 },
  { reason: "Your curiosity about little details", page_number: 3 },
  { reason: "Your style that’s uniquely you", page_number: 3 },

  // Page 4 (31-40) - Character Traits
  { reason: "Your kindness to animals", page_number: 4 },
  { reason: "Your generosity with your time", page_number: 4 },
  { reason: "Your loyalty that never wavers", page_number: 4 },
  { reason: "Your honesty even when it’s hard", page_number: 4 },
  { reason: "Your patience that seems endless", page_number: 4 },
  { reason: "Your calmness in chaotic moments", page_number: 4 },
  { reason: "Your humility despite your talents", page_number: 4 },
  { reason: "Your optimism that’s contagious", page_number: 4 },
  { reason: "Your courage to stand by your values", page_number: 4 },
  { reason: "Your inner strength that’s unshakable", page_number: 4 },

  // Page 5 (41-50) - Habits & Quirks
  { reason: "The way you hum when you’re focused", page_number: 5 },
  { reason: "Your obsession with organizing things", page_number: 5 },
  { reason: "Your love for morning routines", page_number: 5 },
  { reason: "Your excitement over small victories", page_number: 5 },
  { reason: "Your meticulous note-taking habits", page_number: 5 },
  { reason: "Your ability to remember birthdays", page_number: 5 },
  { reason: "Your love for starry nights", page_number: 5 },
  { reason: "Your fascination with old books", page_number: 5 },
  { reason: "Your joy in rainy days", page_number: 5 },
  { reason: "Your signature scent that lingers", page_number: 5 },

  // Pages 6-10 (51-100) - Examples
  { reason: "Your ankles that look delicate yet strong", page_number: 6 },  
  { reason: "Your knees that make even scars look beautiful", page_number: 6 },  
  { reason: "Your hair that dances in the wind", page_number: 6 },  
  { reason: "Your jawline that could sculpt marble", page_number: 6 },  
  { reason: "Your lips that curve perfectly when you think", page_number: 6 },  
  { reason: "Your temples that soften when you’re relaxed", page_number: 6 },  
  { reason: "Your throat that tenses when you’re focused", page_number: 6 },  
  { reason: "Your silhouette against golden hour light", page_number: 6 },  
  { reason: "Your shadow that moves like poetry", page_number: 6 },  
  { reason: "Your reflection that captivates mirrors", page_number: 6 },  

  // page 7 changed to lips
  { reason: "Your lips that look like they were sculpted by Cupid himself", page_number: 7 },  
  { reason: "The way your bottom lip pouts slightly when you’re thinking", page_number: 7 },  
  { reason: "Your perfect lip shape that could inspire artists", page_number: 7 },  
  { reason: "The softness of your lips that I imagine every day", page_number: 7 },  
  { reason: "How your lips curve into a smirk when you’re teasing me", page_number: 7 },  
  { reason: "The way your lips part just before you laugh", page_number: 7 },  
  { reason: "Your lips that make even biting a pencil look elegant", page_number: 7 },  
  { reason: "The faint pink hue of your lips that needs no lipstick", page_number: 7 },  
  { reason: "How your lips press together when you’re determined", page_number: 7 },  
  { reason: "Your lips—the only thing I’d never tire of kissing", page_number: 7 },  

  //page 8 changed to gym
  { reason: "Your discipline to wake up at 5 AM for the gym", page_number: 8 },  
  { reason: "The way your muscles flex when you lift weights", page_number: 8 },  
  { reason: "Your unwavering focus during workouts", page_number: 8 },  
  { reason: "The sweat on your brow that proves your hard work", page_number: 8 },  
  { reason: "Your commitment to counting every macro", page_number: 8 },  
  { reason: "The strength in your arms that could move mountains", page_number: 8 },  
  { reason: "Your gym outfits that make you look like a warrior", page_number: 8 },  
  { reason: "The way you push through the last rep, even when exhausted", page_number: 8 },  
  { reason: "Your Instagram posts that inspire others to train harder", page_number: 8 },  
  { reason: "Your gym progress that shows what dedication truly means", page_number: 8 },    

  //page 9 changed to boxing
  { reason: "The fire in your eyes when you step into the ring", page_number: 9 },  
  { reason: "Your left hook that could knock out doubters", page_number: 9 },  
  { reason: "The way you tape your hands like a seasoned pro", page_number: 9 },  
  { reason: "Your footwork that’s as precise as a dancer’s", page_number: 9 },  
  { reason: "The bruises you wear proudly like battle scars", page_number: 9 },  
  { reason: "Your ability to spar with opponents twice your size", page_number: 9 },  
  { reason: "The sound of your gloves hitting the heavy bag", page_number: 9 },  
  { reason: "Your refusal to sit down between rounds", page_number: 9 },  
  { reason: "The way you study fight tapes to improve", page_number: 9 },  
  { reason: "Your boxing spirit that never backs down", page_number: 9 },  

  //page 10
  { reason: "The way sunlight halos your hair", page_number: 10 },  
  { reason: "How moonlight outlines your profile", page_number: 10 },  
  { reason: "Your shadow stretching beside mine", page_number: 10 },  
  { reason: "Your breath fogging up cold windows", page_number: 10 },  
  { reason: "Your silhouette against city lights", page_number: 10 },  
  { reason: "The way you blink slowly when tired", page_number: 10 },  
  { reason: "Your reflection in rainy puddles", page_number: 10 },  
  { reason: "How you tilt your head when curious", page_number: 10 },  
  { reason: "Your footsteps echoing in quiet halls", page_number: 10 },  
  { reason: "The space you occupy in this world", page_number: 10 },  
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