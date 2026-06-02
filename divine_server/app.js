const path = require("path");
const dotenv = require("dotenv");

// Load environment variables at the very top
dotenv.config({ path: path.join(__dirname, "config/.env") });
// THEN load redis
// require("./config/redisClient.js");
const express = require("express");
const { app, server } = require("./server");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDatabase = require("./config/dataBase");
const errorMiddleware = require("./middlwares/error");
// Load environment variables
app.use(cors({ origin: true, credentials: true }));
connectDatabase();

app.use(express.json()); // Parse JSON data once
app.use(cookieParser()); // Cookie parsing
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Static file serving for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const razorpayPayment = require("./routes/razorpayPayment");
const users = require("./routes/users");
const programs = require("./routes/programs");
const gallery = require("./routes/gallery");

app.use("/api/v1/users", users);
app.use("/api/v1/prayer", razorpayPayment); // സ്പേസ് ഒഴിവാക്കി
app.use("/api/v1/programs", programs); // സ്പേസ് ഒഴിവാക്കി
app.use("/api/v1/gallery", gallery); // സ്പേസ് ഒഴിവാക്കി

// Production configuration
if (process.env.NODE_ENV === "production") {
  console.log("Hello production");
  // Serve frontend static files
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // 💡 app.get-ന് പകരം app.use ഉപയോഗിച്ച് എല്ലാ പേജുകളിലേക്കും index.html കൊടുക്കുന്നു
  app.use((req, res, next) => {
    // API റൂട്ടുകൾ ആണെങ്കിൽ അതിനെ വിട്ടേക്കുക, അല്ലാത്തവയെല്ലാം ഫ്രണ്ട്എൻഡിലേക്ക് വിടുക
    if (req.path.startsWith("/api")) {
      return next();
    }
    console.log("Hello production2");
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running...ok");
  });
}

app.use(errorMiddleware);
// Start server
const PORT = process.env.PORT || 5000;
console.log("PORT from env:", process.env.PORT);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
