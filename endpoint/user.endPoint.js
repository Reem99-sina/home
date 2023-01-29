const { roles } = require("../middleware/auth");

module.exports.endpoint = {
    addquize: [roles.instructor],
    updateUser:[roles.instructor,roles.student],
}