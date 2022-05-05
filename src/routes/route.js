const express = require('express');
const router = express.Router();

const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")


router.post('/createCollege', collegeController.createCollege )
router.get('/getCollegDetails', collegeController.getCollegDetails)
router.post('/createIntern', internController.createIntern)
module.exports =  router;

