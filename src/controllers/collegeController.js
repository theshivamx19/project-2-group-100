
// const jwt = require("jsonwebtoken");
// const validateEmail = require('email-validator');
const http = require('https')
const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel')
const validUrl = require('valid-url');
// const internModel = require('../models/internModel');

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
    // if(validUrl.isWebUri(getData.logoLink)){
    //   console.log(getData.logoLink)
    //   return res.status(400).send({status: false, msg : "Enter the valid URL"})
    // }

    if (Object.keys(getData).length == 0)
      return res.status(400).send({ status: false, msg: "Data is required to add a College" });

    let showCollegeData = await collegeModel.create(getData);
    res.status(201).send({ status: true, data: showCollegeData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
}

// const getCollegeDetails = async function (req, res) {
//   try {
//     let collegeName = req.query
//     console.log(collegeName)
//     if(!collegeName.name){
//       return res.status(400).send({status : false, msg : "Enter the correct college name"})
//     }

//     const newCollege = await collegeModel.findOne({ name: collegeName, isDeleted : false })
//     // console.log(resultName)
//     if(!newCollege){
//       return res.status(400).send({status: false, msg : "College doesn't exist"})
//     }
    
//     // return res.status(201).send({ status: true, data: resultName })

//   }
//   catch (err) {
//     res.status(400).send({ status: false, msg: err.message })
//   }
// }

const collegeDetails = async function (req, res) {
  try {
      const collegeName = req.query.name
      if (!collegeName) return res.status(400).send({ status: false, message: 'College name is required to access data' })

      //==================================================DB check for college=======================================================

      const newCollege = await collegeModel.findOne({ name: collegeName, isDeleted: false });
      if (!newCollege) return res.status(404).send({ status: false, message: "College does not exit" });

      //===================================================DB check for Interns=======================================================

      const interns = await internModel.find({ collegeId: newCollege._id, isDeleted: false }, { name: 1, email: 1, mobile: 1 });
      if (!interns) return res.status(404).send({ status: false, message: "Interns does not exit" });

      //====================================Show perticular college interns Detailes=================================================         

      res.status(200).send({ data: { name: newCollege.name, fullName: newCollege.fullName, logoLink: newCollege.logoLink, interns: interns } })

  } catch (error) {
      res.status(500).send({ status: false, message: error.message });
  }
}
module.exports.createCollege = createCollege;
module.exports.collegeDetails = collegeDetails
