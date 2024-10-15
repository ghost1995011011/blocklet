const sqlite3 = require('better-sqlite3');
const path = require('path');

// Initialize the database file (it will be created if it doesn't exist)
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = sqlite3(dbPath);

// Create a profile table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    phone TEXT
  )
`);

// Function to get the profile from the database
function getProfile() {
  const row = db.prepare('SELECT * FROM profile LIMIT 1').get();
  if (row) {
    return row;
  } else {
    return { username: '', email: '', phone: '' };  // Default empty profile
  }
}

// Function to update the profile in the database
function updateProfile(profile) {
  const existing = getProfile();
  if (existing.id) {
    db.prepare(
      'UPDATE profile SET username = ?, email = ?, phone = ? WHERE id = ?'
    ).run(profile.username, profile.email, profile.phone, existing.id);
  } else {
    db.prepare(
      'INSERT INTO profile (username, email, phone) VALUES (?, ?, ?)'
    ).run(profile.username, profile.email, profile.phone);
  }
}

module.exports = { getProfile, updateProfile };
