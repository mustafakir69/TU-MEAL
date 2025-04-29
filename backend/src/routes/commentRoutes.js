const express =require("express");
const router =express.Router();
const commetController =require("../controller/commentController");
const { verifyAccessToken } = require("../middleware/authMiddleware");

router.post("/",verifyAccessToken,commetController.userCommentPost);
router.get("/",verifyAccessToken,commetController.userCommentGet);

module.exports=router;