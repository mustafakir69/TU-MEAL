const express =require("express");
const router = express.Router();
const User = require("../../model/User")

router.get("/getUser", async(req,res)=>{
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        const users = await User.find();
        res.render("users/userGet", {
            users,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).json(error)
    }
  

});
router.get("/deleteUser", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("users/userDelete",{ user: req.session.user });
});
router.get("/updateUser", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("users/userUpdate",{ user: req.session.user });
});
router.get("/createUser", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("users/userCreate",{ user: req.session.user });
});

module.exports= router;