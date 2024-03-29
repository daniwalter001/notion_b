const Joi = require("joi");

const addAbonnementValidator = async (req, res, next) => {
  try {
    await Joi.object({
      cs_token: Joi.string().required(),
      souscripteur_token: Joi.string().required(),
      souscription_token: Joi.string().required(),
      start_date: Joi.string().required(),
      duration: Joi.string().required(),
      start_date: Joi.string().optional(),
    }).validateAsync(req.body);
    return next();
  } catch (error) {
    console.log("error in addabbvalidator");
    return next(error);
  }
};

module.exports = { addAbonnementValidator };
