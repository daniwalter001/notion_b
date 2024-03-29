const taskRouter = require("express").Router();

const salt = parseInt(process.env.BCRYPT_SALT);

const { TaskController } = require("../controllers/TaskController");

taskRouter
  .post("/add", TaskController.addTask)
  .get("/all", TaskController.getAllTasks)
  .get("/:token", TaskController.getTaskByToken)
  .patch("/update/:token", TaskController.updateTaskByToken)
  .delete("/delete/:token", TaskController.deleteTask);

module.exports = { taskRouter };
