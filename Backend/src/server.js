//! -------- IMPORTS --------
const app = require("./app");
const connectDB = require("./config/db");

//! -------- DATABASE CONNECTION --------
// connectDB();

//! -------- SERVER --------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});