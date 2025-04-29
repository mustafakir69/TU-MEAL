const express = require('express');
const router = express.Router();
const {userRateMeal} = require('../controller/userRateController');


router.post('/',userRateMeal);


module.exports=router;
