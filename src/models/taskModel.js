// const { tasksCollection } = require("../config/firebase");

// exports.createTask = async (task) => {
//   const docRef = await tasksCollection.add(task);
//   return { id: docRef.id, ...task };
// };
// exports.updateTask = async (taskId, updatedTask) => {
//   await tasksCollection.doc(taskId).update(updatedTask);
// };
// exports.deleteTask = async (taskId) => {
//   await tasksCollection.doc(taskId).delete();
// };
// exports.getTasksByUser = async (userId) => {
//   const snapshot = await tasksCollection.where("userId", "==", userId).get();
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };
// exports.getTaskById = async (taskId) => {
//   const doc = await tasksCollection.doc(taskId).get();
//   return doc.exists ? { id: doc.id, ...doc.data() } : null;
// };


const { tasksCollection } = require("../config/firebase");

// ✅ Create a new task in Firestore
exports.createTask = async (task) => {
  try {
    const docRef = await tasksCollection.add(task);
    return { id: docRef.id, ...task };
  } catch (error) {
    console.error("❌ Firestore Error (Create Task):", error.message);
    throw new Error("Failed to create task in Firestore");
  }
};

// ✅ Update an existing task
exports.updateTask = async (taskId, updatedTask) => {
  try {
    await tasksCollection.doc(taskId).update(updatedTask);
    return { id: taskId, ...updatedTask };
  } catch (error) {
    console.error("❌ Firestore Error (Update Task):", error.message);
    throw new Error("Failed to update task in Firestore");
  }
};

// ✅ Delete a task
exports.deleteTask = async (taskId) => {
  try {
    await tasksCollection.doc(taskId).delete();
    return { message: "Task deleted successfully" };
  } catch (error) {
    console.error("❌ Firestore Error (Delete Task):", error.message);
    throw new Error("Failed to delete task in Firestore");
  }
};

// ✅ Get all tasks for a specific user
exports.getTasksByUser = async (userId) => {
  try {
    const snapshot = await tasksCollection.where("userId", "==", userId).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Firestore Error (Get Tasks By User):", error.message);
    throw new Error("Failed to retrieve tasks from Firestore");
  }
};

// ✅ Get a specific task by ID
exports.getTaskById = async (taskId) => {
  try {
    const doc = await tasksCollection.doc(taskId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch (error) {
    console.error("❌ Firestore Error (Get Task By ID):", error.message);
    throw new Error("Failed to retrieve task from Firestore");
  }
};
