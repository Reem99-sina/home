const { endpoint } = require('../endpoint/user.endPoint');
const { auth } = require('../middleware/auth');
const { validateschema } = require('../middleware/validation');
const { myMulter, fileValdation, imagetype } = require('../services/multer');
const { signup, signin, updateUser, deleteuser, alluser, allinstructoruser, allstudentuser } = require('../services/user.service');
const { validatesignup, validatesignin, validateupdate } = require('../validationDate/user.validation.schema');
const router = require('express').Router();
router.get("/alluser",auth(endpoint.updateUser),alluser)
router.get("/allinstructoruser",auth(endpoint.updateUser),allinstructoruser)
router.get("/allstudentuser",auth(endpoint.addquize),allstudentuser)
router.post("/signup",myMulter("/picture",imagetype.Type).single("image"),validateschema(validatesignup),signup)
router.post("/signin",validateschema(validatesignin),signin)
router.patch("/update",auth(endpoint.updateUser),validateschema(validateupdate),updateUser)
router.patch("/delete",auth(endpoint.updateUser),deleteuser)
module.exports=router