const { endpoint } = require('../endpoint/user.endPoint');
const { auth } = require('../middleware/auth');
const { validateschema } = require('../middleware/validation');
const { addQuize, updateQuize, updatenameQuize, deleteQuize, getquizes } = require('../services/quize.service');
const { validateaddquize, validateupdatequize } = require('../validationDate/quize.validation.schema');

const router = require('express').Router();
router.post("/addQuize",auth(endpoint.addquize),validateschema(validateaddquize),addQuize)
router.patch("/updateQuize/:_id",auth(endpoint.addquize),validateschema(validateupdatequize),updatenameQuize)
router.delete("/deletequize/:_id",auth(endpoint.addquize),deleteQuize);
router.get("/quizes",auth(endpoint.updateUser),getquizes);

module.exports=router