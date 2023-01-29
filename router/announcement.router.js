const { endpoint } = require('../endpoint/user.endPoint');
const { auth } = require('../middleware/auth');
const { validateschema } = require('../middleware/validation');
const { addannouncement, getAnnouncement, deleteAnnouncement, updateAnnouncement } = require('../services/announcement.service');
const { validateaddannouncement, validateupdateAnnouncement } = require('../validationDate/announcement.validation');
const router = require('express').Router();
router.post("/addannouncement",auth(endpoint.addquize),validateschema(validateaddannouncement),addannouncement)
router.patch("/updateAnnouncement/:_id",auth(endpoint.addquize),validateschema(validateupdateAnnouncement),updateAnnouncement)
router.delete("/deleteAnnouncement/:_id",auth(endpoint.addquize),deleteAnnouncement);
router.get("/announcement",auth(endpoint.updateUser),getAnnouncement);

module.exports=router