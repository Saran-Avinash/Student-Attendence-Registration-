const express = require('express');
const studentRouter = express.Router();

const getDetails = require('../studentController/studentController.js');
const studentController = require('../studentController/studentController.js');

studentRouter.get('/', studentController.display);
studentRouter.post('/put', studentController.recordAttendance);
studentRouter.post('/getAttendance', studentController.getAttendance);


module.exports = studentRouter;