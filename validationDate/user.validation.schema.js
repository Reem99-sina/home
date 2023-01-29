const Joi = require("joi");

module.exports.validatesignup = {
    body: Joi.object().required().keys({
        username: Joi.string().required(),
        password: Joi.string().required().pattern(new RegExp('[a-z]{4}')),
        cpassword: Joi.valid(Joi.ref("password")).required(),
        role: Joi.string().required()
    })
}
module.exports.validatesignin = {
    body: Joi.object().required().keys({
        username: Joi.string().required(),
        password: Joi.string().required().pattern(new RegExp('[a-z]{4}')),
        cpassword: Joi.valid(Joi.ref("password")).required()
    })
}
module.exports.validateupdate = {
    body: Joi.object().keys({
        username: Joi.string(),
        password: Joi.string().pattern(new RegExp('[a-z]{4}')),
        role: Joi.string()
    })
}