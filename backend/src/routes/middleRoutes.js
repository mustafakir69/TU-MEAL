const express = require("express");
const router =express.Router();
const middleController = require("../controller/middlewareController");
router.get("/profile",middleController.getProfile)
module.exports=router;