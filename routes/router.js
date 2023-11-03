const express = require("express");
const {getAllusers, createUser,verifUser }  = require("../controller/userController");

const router = express.Router();


router.get('/alluser', getAllusers);
router.post('/createuser', createUser);
router.post('/verifuser', verifUser);



module.exports = router;