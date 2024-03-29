const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { formatFirstname } = require("../helpers/functions");
const salt = parseInt(process.env.BCRYPT_SALT);

const addTask = async ({ token, task_name, assignee, due }) => {
  try {
    return await sequelize.models.Tasks.create({
      token,
      task_name,
      assignee: formatFirstname(assignee),
      due,
    });
  } catch (error) {
    console.log({ error });
  }

  return false;
};

const checkTask = async ({ task_name, assignee }) => {
  try {
    return (
      (
        await sequelize.models.Tasks.findAll({
          where: {
            task_name,
            assignee,
          },
        })
      ).length === 0
    );
  } catch (error) {
    console.log({ error });
  }
  return false;
};

const taskNotExists = async ({ token }) => {
  try {
    return (
      (
        await sequelize.models.Tasks.findAll({
          where: {
            token,
          },
        })
      ).length === 0
    );
  } catch (error) {
    console.log({ error });
  }
  return false;
};

const getTaskByToken = async (token) => {
  try {
    let task = await sequelize.models.Tasks.findOne({
      where: {
        token,
      },
    });
    return task;
  } catch (error) {}
  return false;
};

const updateTaskByToken = async (token, data) => {
  try {
    let updated = await sequelize.models.Tasks.update(data, {
      where: {
        token,
      },
    });
    return updated.length != 0 ? updated : false;
  } catch (error) {
    console.log({ error });
  }
  return false;
};

const deleteTaskByToken = async (userToken) => {
  let deleted = await sequelize.models.Tasks.destroy({
    where: {
      token: userToken,
    },
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const getTaskByAssignee = async (assignee) => {
  let task = await sequelize.models.Tasks.findOne({
    where: {
      assignee,
    },
  });
  return task;
};

const getTasksBy = async (data = {}) => {
  try {
    let _ = await sequelize.models.Tasks.findAll({
      where: data,
      order: [["order", "ASC"]],
    });
    return _.map((el) => el.toJSON());
  } catch (error) {
    return [];
  }
};

const getAllTasks = async (data = {}) => {
  try {
    let _ = await sequelize.models.Tasks.findAll({
      order: [["order", "ASC"]],
    });
    return _.map((el) => el.toJSON());
  } catch (error) {
    return [];
  }
};

module.exports = {
  addTask,
  checkTask,
  taskNotExists,
  getTaskByToken,
  updateTaskByToken,
  deleteTaskByToken,
  getTaskByAssignee,
  getTasksBy,
  getAllTasks,
};
