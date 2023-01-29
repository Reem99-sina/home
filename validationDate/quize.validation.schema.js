const Joi = require("joi");

module.exports.validateaddquize = {
    body: Joi.object().required().keys({
        namequize: Joi.string().required(),
        course: Joi.string().required(),
        topic: Joi.string().required(),
        dueto: Joi.date().required()
    })
}
module.exports.validateupdatequize = {
    body: Joi.object().keys({
        namequize: Joi.string(),
        course: Joi.string(),
        topic: Joi.string(),
        dueto: Joi.date()
    })
}