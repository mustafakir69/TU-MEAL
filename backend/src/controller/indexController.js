const User = require("../model/User")
const indexGet = async(req,res)=>{
    res.render("home",{ user: req.session.user });
};
const passwordForgetGet=async (req,res)=>{
    res.render("forgot-password")
};
const loginGet = async(req,res)=>{
    res.render("login");
};
const registerGet = async(req,res)=>{
    res.render("register");
};
const tablesGet = async(req,res)=>{
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const users = await User.find();
        res.render("tables", {
            users,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const p404Get = async(req,res)=>{
    res.render("404",{ user: req.session.user });
};
const blankGet = async(req,res)=>{
    res.render("blank",{ user: req.session.user });
};

module.exports={
    indexGet,
    passwordForgetGet,
    blankGet,
    p404Get,
    loginGet,
    registerGet,
    tablesGet,
    
}