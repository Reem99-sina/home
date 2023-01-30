const Joi = require("joi");

module.exports.validateaddannouncement = {
    body: Joi.object().required().keys({
        paragraph: Joi.string().required(),
        date:Joi.string()
    })
}
module.exports.validateupdateAnnouncement = {
    body: Joi.object().keys({
        paragraph: Joi.string(),
    })
}