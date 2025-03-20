require("dotenv").config(); // ✅ Load environment variables
require("./config/firebase"); // ✅ Ensure Firebase is initialized before anything else

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const taskRoutes = require("./routes/taskRoutes");
const meetRoutes = require("./routes/meetRoutes");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ✅ Logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`📢 [${req.method}] ${req.url}`);
  next();
});

// ✅ Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/meet", meetRoutes);

// ✅ Handle 404 errors
app.use((req, res) => {
  console.warn(`⚠️ 404 - Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Route not found" });
});

// ✅ Global Error Handling
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
