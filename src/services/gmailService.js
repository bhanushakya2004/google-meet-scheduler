const { google } = require("googleapis");

const sendMeetEmail = async (recipients, meetLink, subject, accessToken) => {
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const emailBody = [
      `To: ${recipients.join(", ")}`,
      "Subject: Meeting Invitation - " + subject,
      "MIME-Version: 1.0",
      'Content-Type: text/html; charset="UTF-8"',
      "",
      "<p>Hello,</p>",
      "<p>You have been invited to a Google Meet session:</p>",
      `<p><strong>Meeting Link:</strong> <a href="${meetLink}">${meetLink}</a></p>`,
      "<p>Thank you!</p>",
    ].join("\n");
    console.log(emailBody);
    const base64EncodedEmail = Buffer.from(emailBody)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: base64EncodedEmail,
      },
    });

    console.log("✅ Meet invitation sent successfully!");
  } catch (error) {
    console.error("❌ Gmail API Error:", error.message);
    throw new Error("Failed to send Meet invitation");
  }
};

module.exports = { sendMeetEmail };
