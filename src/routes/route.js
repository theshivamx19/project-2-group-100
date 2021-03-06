const express = require('express');
const router = express.Router();

const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")


router.post('/createCollege', collegeController.createCollege )
router.get('/collegeDetails', collegeController.collegeDetails)
router.post('/createIntern', internController.createIntern)
module.exports =  router;

