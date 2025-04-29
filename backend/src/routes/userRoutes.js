const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {verifyAccessToken}=require("../middleware/authMiddleware")


router.get("/",verifyAccessToken,userController.getUsersController);
router.post("/",verifyAccessToken,userController.createUserController);
router.put("/:id",verifyAccessToken,userController.updateUserController);
router.delete("/:id",verifyAccessToken,userController.deleteUserController);


module.exports = router;

