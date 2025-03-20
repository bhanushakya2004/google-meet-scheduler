// const Task = require("../models/taskModel");
// const GoogleCalendar = require("../services/googleCalendarService");

// exports.createTask = async (req, res) => {
//   try {
//     const task = { ...req.body, userId: req.user.email, completed: false };

//     // Sync with Google Calendar
//     const eventId = await GoogleCalendar.createGoogleCalendarEvent(task, req.user.access_token);
//     task.eventId = eventId;

//     // Store in Firebase
//     const newTask = await Task.createTask(task);

//     res.status(201).json(newTask);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.getTasks(req.user.email);
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getTaskById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const task = await Task.getTaskById(id);

//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.status(200).json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     // Fetch existing task to get eventId
//     const existingTask = await Task.getTaskById(id);
//     if (!existingTask) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     // Update in Google Calendar if needed
//     if (updatedData.title || updatedData.dueDate) {
//       await GoogleCalendar.updateGoogleCalendarEvent(existingTask.eventId, updatedData, req.user.access_token);
//     }

//     // Update in Firebase
//     await Task.updateTask(id, updatedData);
    
//     res.status(200).json({ message: "Task updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteTask = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Fetch task to get eventId
//     const task = await Task.getTaskById(id);
//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     // Delete from Google Calendar
//     if (task.eventId) {
//       await GoogleCalendar.deleteGoogleCalendarEvent(task.eventId, req.user.access_token);
//     }

//     // Delete from Firebase
//     await Task.deleteTask(id);

//     res.status(200).json({ message: "Task deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// const Task = require("../models/taskModel");
// const GoogleCalendar = require("../services/googleCalendarService");

// exports.createTask = async (req, res) => {
//   try {
//     const task = { ...req.body, userId: req.user.email, completed: false };

//     // Sync with Google Calendar
//     const eventId = await GoogleCalendar.createGoogleCalendarEvent(task, req.user.access_token);
//     task.eventId = eventId;

//     // Store in Firebase
//     const newTask = await Task.createTask(task);

//     res.status(201).json(newTask);
//   } catch (error) {
//     console.error("Error creating task:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.getTasksByUser(req.user.email); // ✅ Fixed function name
//     res.status(200).json(tasks);
//   } catch (error) {
//     console.error("Error getting tasks:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getTaskById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const task = await Task.getTaskById(id);

//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.status(200).json(task);
//   } catch (error) {
//     console.error("Error getting task by ID:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     // Fetch existing task to get eventId
//     const existingTask = await Task.getTaskById(id);
//     if (!existingTask) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     // Update in Google Calendar if needed
//     if (updatedData.title || updatedData.dueDate) {
//       await GoogleCalendar.updateGoogleCalendarEvent(existingTask.eventId, updatedData, req.user.access_token);
//     }

//     // Update in Firebase
//     await Task.updateTask(id, updatedData);

//     res.status(200).json({ message: "Task updated successfully" });
//   } catch (error) {
//     console.error("Error updating task:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteTask = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Fetch task to get eventId
//     const task = await Task.getTaskById(id);
//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     // Delete from Google Calendar
//     if (task.eventId) {
//       await GoogleCalendar.deleteGoogleCalendarEvent(task.eventId, req.user.access_token);
//     }

//     // Delete from Firebase
//     await Task.deleteTask(id);

//     res.status(200).json({ message: "Task deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting task:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

const GoogleCalendar = require("../services/googleCalendarService");
const GmailService = require("../services/gmailService");
const Task = require("../models/taskModel"); // Ensure Task model is imported

exports.createTask = async (req, res) => {
  try {
    const task = { ...req.body, userId: req.user.email, completed: false };

    let eventId = null;
    let meetLink = null;

    // 🟢 If task requires a Google Meet
    if (task.requiresMeet) {
      const eventResponse = await GoogleCalendar.createGoogleMeetEvent(task, req.user.access_token);
      eventId = eventResponse.eventId;
      meetLink = eventResponse.meetLink;
      task.meetLink = meetLink; // Store in Firestore
    }

    // 🟢 Save Task in Firestore
    const newTask = await Task.createTask({ ...task, eventId });

    // 🟢 Send Email Notification
    if (meetLink && task.attendees && task.attendees.length > 0) {
      await GmailService.sendMeetEmail(task.attendees, meetLink, task.title);
    }

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Define remaining task functions to avoid errors
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.updateTask(req.params.id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.deleteTask(req.params.id);
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.getTasks(req.user.email);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.getTaskById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
