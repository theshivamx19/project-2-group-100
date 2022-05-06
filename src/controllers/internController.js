const { get } = require('express/lib/response')
// const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const validateEmail = require('email-validator');

//========================CREATE INTERNS===================================
const createIntern = async function (req, res) {
  try {
    let createData = req.body

    if ((createData.name) == 0) {
      return res.status(400).send({ status: false, msg: "Enter the Name" })
    }
    if ((createData.email) == 0) {
      return res.status(400).send({ status: false, msg: "Enter the email" })
    }
    if ((createData.mobile) == 0 && (getData.mobile.length == 10)) {
      return res.status(400).send({ status: false, msg: "Enter the valid mobile number or you haven't entered any mobile number" })
    }
    if ((createData.collegeId) == 0) {
      return res.status(400).send({ status: false, msg: "Enter the college Id" })
    }
    
    if (Object.keys(createData).length > 0)
      console.log(Object.keys(createData).length)
    let savedData = await internModel.create(createData)

    // if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
    //   return res.status(400).send({ status: false, msg: 'email should be avalid email address' })}
    return res.status(201).send({ status: true, data: savedData })

  }
  catch (err) {
    return res.send({ msg: err.message })
  }
}
module.exports.createIntern = createIntern
