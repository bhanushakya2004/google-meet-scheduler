const express = require("express");
const { scheduleMeet, getMeetingById, getUserMeetings, updateMeeting, deleteMeeting } = require("../controllers/meetController");
const authMiddleware = require("../middlewares/authMiddleware"); // ✅ Import middleware

const router = express.Router();

router.post("/schedule", authMiddleware, scheduleMeet); // ✅ Requires authentication
router.get("/:id", authMiddleware, getMeetingById); // ✅ Requires authentication
router.get("/user/me", authMiddleware, getUserMeetings); // ✅ Fetch meetings for logged-in user
router.put("/update/:id", authMiddleware, updateMeeting); // ✅ Requires authentication
router.delete("/delete/:id", authMiddleware, deleteMeeting); // ✅ Requires authentication

module.exports = router;
