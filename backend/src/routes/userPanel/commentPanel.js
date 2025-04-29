const express =require("express");
const router = express.Router();
const Comment = require("../../model/Comment")
const User = require("../../model/User")
const Meal = require("../../model/Meal")
router.get("/getComment", async(req,res)=>{
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        // Yorumları user ve meal bilgileriyle çekiyoruz
        const comments = await Comment.find()
            .populate("userId", "firstName lastName") // Kullanıcının adı ve soyadı
            .populate("mealId", "mealName date"); // Yemek adı ve tarihi

        res.render("comment/commentGet", {
            comments, // Yorumları EJS'e gönder
            user: req.session.user
        });
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/deleteComment", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("comment/commentDelete",{ user: req.session.user });
});
router.get("/updateComment", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("comment/commentUpdate",{ user: req.session.user });
});
router.get("/createComment", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("comment/commentCreate",{ user: req.session.user });
});
module.exports= router;