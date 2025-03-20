Google Meet Scheduling API 🚀
This project is a Node.js Express API that allows users to schedule Google Meet meetings, store meeting details in Firebase, and send email notifications.

Features
✅ Schedule Google Meet meetings using Google Calendar API
✅ Store meeting details in Firebase
✅ Fetch meetings by ID or user email
✅ Update & delete scheduled meetings
✅ Secure authentication with OAuth 2.0

Tech Stack 🛠
Backend: Node.js, Express
Database: Firebase Firestore
Authentication: Google OAuth 2.0
Deployment: GCP Cloud Run
Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone <repo-url>
cd task-service
2️⃣ Install Dependencies
sh
Copy
Edit
npm install
3️⃣ Set Up Firebase
Add your Firebase Service Account JSON to /config/firebase.json
4️⃣ Configure Environment Variables
Create a .env file and add:

env
Copy
Edit
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=your-redirect-uri
5️⃣ Run Locally
sh
Copy
Edit
npm start
API Endpoints
🔹 Schedule a Meeting
POST /api/meet/schedule

Headers: Authorization: Bearer <access_token>
Body:
json
Copy
Edit
{
  "title": "Team Meeting",
  "description": "Weekly sync-up",
  "startTime": "2025-03-20T10:00:00Z",
  "endTime": "2025-03-20T11:00:00Z",
  "attendees": ["user1@example.com", "user2@example.com"]
}
Response:
json
Copy
Edit
{
  "message": "Meet scheduled successfully",
  "eventId": "xyz123",
  "meetLink": "https://meet.google.com/xyz-abc"
}
🔹 Get Meeting by ID
GET /api/meet/:id

🔹 Get Meetings by User
GET /api/meet/user/:email

🔹 Update a Meeting
PUT /api/meet/update/:id

🔹 Delete a Meeting
DELETE /api/meet/delete/:id

Deployment to GCP Cloud Run
Build Docker Image:
sh
Copy
Edit
docker build -t meet-scheduler .
Run Locally:
sh
Copy
Edit
docker run -p 8080:8080 meet-scheduler
Deploy to Cloud Run:
sh
Copy
Edit
gcloud run deploy meet-scheduler --source .
Contributing
Feel free to submit issues and pull requests to improve this project.
