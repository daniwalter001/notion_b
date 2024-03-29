const {
  checkTask,
  getTaskByToken,
  deleteTaskByToken,
  updateTaskByToken,
  getTasksBy,
  addTask,
  getAllTasks,
} = require("../repository/TaskRepository");

class TaskController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  static addTask = async (req, res, next) => {
    try {
      if (!req.body?.token) {
        return res.status(200).json({
          message: "Invalid data",
          error: true,
        });
      }

      console.log(req.body);

      let check = await checkTask(req.body);

      if (check) {
        let task = await addTask(req.body);

        if (task) {
          res.status(200).json({
            data: task,
            success: true,
            message: "Task added",
          });
          return;
        }
        res.status(200).json({
          message: "Cette tache n'a pas pu etre ajouté. Veuillez ressayer!",
          error: true,
        });
        return;
      } else {
        res.status(200).json({
          message: "Cette tache existe deja",
          error: true,
        });
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  /**
   * Get All Tasks
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  static getAllTasks = async (req, res) => {
    try {
      let tasks = await getAllTasks();
      if (tasks) {
        return res.status(200).json({
          data: tasks,
          success: true,
        });
      } else {
        return res.status(200).json({
          error: true,
        });
      }
    } catch (err) {
      return res.status(200).json({
        error: true,
        data: err,
      });
    }
  };

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  static getTaskByToken = async (req, res) => {
    try {
      if (!req.params?.token) {
        return res.status(200).json({
          message: "Invalid data",
          error: true,
        });
      }
      let task = await getTaskByToken(req.params?.token);
      if (task) {
        return res.status(200).json({
          data: task,
          success: true,
        });
      } else {
        return res.status(200).json({
          token: req.params?.token,
          error: true,
        });
      }
    } catch (err) {
      return res.status(200).json({
        error: true,
        data: err,
      });
    }
  };

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  static updateTaskByToken = async (req, res) => {
    try {
      if (!req.params?.token) {
        return res.status(200).json({
          message: "Invalid data",
          error: true,
        });
      }
      let task = await getTaskByToken(req.params?.token);
      if (task) {
        let update = await updateTaskByToken(req.params?.token, req.body);
        if (update.length) {
          return res.status(200).json({
            success: true,
            message: "Task updated",
          });
        } else {
          return res.status(200).json({
            token: req.params?.token,
            error: true,
          });
        }
      } else {
        return res.status(200).json({
          error: true,
          message: "Invalid token",
          data: req.params?.token,
        });
      }
    } catch (err) {
      return res.status(200).json({
        error: true,
        data: err,
      });
    }
  };

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  static deleteTask = async (req, res) => {
    try {
      if (!req.params?.token) {
        return res.status(200).json({
          message: "Invalid data",
          error: true,
        });
      }
      let _ = await deleteTaskByToken(req?.params?.token);
      if (_.length != 0) {
        return res.status(200).json({
          success: true,
          message: "Tache supprimée avec succes",
        });
      }
    } catch (err) {
      return res.status(200).json({
        error: true,
        message: "Operation non aboutie",
        data: err,
      });
    }
  };
}

module.exports = { TaskController };
