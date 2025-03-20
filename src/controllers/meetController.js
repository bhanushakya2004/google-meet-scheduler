const { createGoogleMeetEvent } = require("../services/googleCalendarService");
const { db } = require("../config/firebase"); // ✅ Import db from firebase.js

exports.scheduleMeet = async (req, res) => {
  try {
    const { title, description, startTime, endTime, attendees } = req.body;
    const { email: createdBy, access_token: accessToken } = req.user; // ✅ Get from middleware

    if (!title || !startTime || !endTime || !createdBy || !accessToken) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const eventData = { title, description, startTime, endTime, attendees, createdBy };
    const result = await createGoogleMeetEvent(eventData, accessToken);

    // ✅ Save to Firestore
    await db.collection("user_meetings").doc(result.eventId).set({
      ...eventData,
      meetLink: result.meetLink,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Meet scheduled successfully", eventId: result.eventId, meetLink: result.meetLink });
  } catch (error) {
    console.error("❌ Error scheduling meet:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("user_meetings").doc(id).get();

    if (!doc.exists) return res.status(404).json({ error: "Meeting not found" });

    res.json(doc.data());
  } catch (error) {
    console.error("❌ Error fetching meeting:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserMeetings = async (req, res) => {
  try {
    const { email } = req.user; // ✅ Get email from middleware
    const snapshot = await db.collection("user_meetings").where("createdBy", "==", email).get();

    const meetings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(meetings);
  } catch (error) {
    console.error("❌ Error fetching user meetings:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    await db.collection("user_meetings").doc(id).update(updateData);
    res.json({ message: "Meeting updated successfully" });
  } catch (error) {
    console.error("❌ Error updating meeting:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("user_meetings").doc(id).delete();
    res.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting meeting:", error);
    res.status(500).json({ error: error.message });
  }
};
