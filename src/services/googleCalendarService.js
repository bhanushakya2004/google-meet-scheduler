const { google } = require("googleapis");
const admin = require("firebase-admin");

// Initialize Firebase (Make sure this is done in your app)
const db = admin.firestore();

const formatDateToISO = (date) => new Date(date).toISOString();

const createGoogleMeetEvent = async (task, accessToken) => {
  try {
    if (!accessToken) throw new Error("Missing access token for Google Calendar API");

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: task.title,
      description: task.description || "",
      start: { dateTime: formatDateToISO(task.startTime), timeZone: "UTC" },
      end: { dateTime: formatDateToISO(task.endTime), timeZone: "UTC" },
      conferenceData: {
        createRequest: { requestId: Math.random().toString(36).substring(7) },
      },
      attendees: task.attendees ? task.attendees.map((email) => ({ email })) : [],
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1, // Enable Google Meet
      sendUpdates: "all", // ✅ This ensures Google sends invites automatically
    });

    const meetLink = response.data.hangoutLink;
    const eventId = response.data.id;

    // ✅ Store in Firebase
    await db.collection("user_meetings").doc(eventId).set({
      meetingId: eventId,
      title: task.title,
      description: task.description || "",
      startTime: task.startTime,
      endTime: task.endTime,
      meetLink: meetLink,
      createdBy: task.createdBy, // email of creator
      attendees: task.attendees.map((email) => ({ email, status: "needsAction" })), // Default status
      createdAt: new Date().toISOString(),
    });

    return { eventId, meetLink };
  } catch (error) {
    console.error("❌ Google Meet Creation Error:", error.message);
    throw new Error("Failed to create Google Meet event");
  }
};

module.exports = { createGoogleMeetEvent };
