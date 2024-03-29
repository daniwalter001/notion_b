const Joi = require("joi");

const addPermissionValidator = async (req, res, next) => {
  try {
    await Joi.object({
      status: Joi.string().required(),
      patient_token: Joi.string().required(),
      user_token: Joi.string().required(),
      cs_token: Joi.string().required(),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in addpermvalidator");
    return next(error);
  }
};

module.exports = { addPermissionValidator };
