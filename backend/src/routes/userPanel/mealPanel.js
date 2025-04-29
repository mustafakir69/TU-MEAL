const express =require("express");
const router = express.Router();
const Meal = require("../../model/Meal")

router.get("/getMeal", async(req,res)=>{
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        const meals = await Meal.find();
        res.render("meals/mealGet", {
            meals,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).json(error)
    }
});
router.get("/deleteMeal", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("meals/mealDelete",{ user: req.session.user });
});
router.get("/updateMeal", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("meals/mealUpdate",{ user: req.session.user });
});
router.get("/createMeal", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("meals/mealCreate",{ user: req.session.user });
});

module.exports= router;