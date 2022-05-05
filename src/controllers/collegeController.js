
// const jwt = require("jsonwebtoken");
// const validateEmail = require('email-validator');
const collegeModel = require('../models/collegeModel');

const createCollege = async (req, res) => {
  try {
    let getData = req.body;
    if ((getData.fname) == 0) {
      return res.status(400).send({ status: false, msg: "Enter your College Name" });
    }
    if ((getData.fullName) == 0) {
      return res.status(400).send({ status: false, msg: "Enter your College Full Name" });
    }
    if ((getData.logoLink) == 0) {
      return res.status(400).send({ status: false, msg: "Enter the logoLink" })
    }

    if (Object.keys(getData).length == 0)
      return res.status(400).send({ status: false, msg: "Data is required to add a College" });

    let showCollegeData = await collegeModel.create(getData);
    res.status(201).send({ status: true, data: showCollegeData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
}

const getCollegDetails = async function (req, res) {
  try {
    let collegeName = req.params
    console.log(collegeName)
    if(!collegeName.name){
      return res.status(400).send({status : false, msg : "Enter the correct college name"})
    }
    const resultName = await collegeModel.find({ name: collegeName.name })
    return res.status(201).send({ status: true, data: resultName })
  }
  catch (err) {
    res.status(400).send({ status: false, msg: err.message })
  }
}



module.exports.createCollege = createCollege;
module.exports.getCollegDetails = getCollegDetails
