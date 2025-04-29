const mongoose = require('mongoose');
const Meal = require('../model/Meal');


// DAY AND WEEK
const dayGetController = async (req,res) => {
   try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Bugünün başlangıcı
    
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // Bugünün sonu
    
    const meal = await Meal.findOne({
        date: { $gte: todayStart, $lt: todayEnd }
    });
    res.status(200).json(meal);
   } catch (error) {
    res.status(500).json({message:error.message});
   }

};

const weekGetController = async (req,res) => {
    const today = new Date();
const firstDayOfWeek = new Date(today);
firstDayOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Pazartesi'yi bul
firstDayOfWeek.setHours(0, 0, 0, 0);

// Yerel saat diliminde haftanın son günü (Pazar)
const lastDayOfWeek = new Date(firstDayOfWeek);
lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Pazar'ı bul
lastDayOfWeek.setHours(23, 59, 59, 999);
    const meals = await Meal.find({
      date: { $gte: firstDayOfWeek, $lte: lastDayOfWeek } 
    });
    res.status(200).json(meals);
};
// CRUD OPERATIONS
const getMealController = async (req,res) => {
    try {
    const meals = await Meal.find();
    res.status(200).json(meals);
        } catch (error) {
    res.status(500).json({message:error.message});
        }
};

const createMealController = async (req,res) => {
    try {
        const {date,mealName,calories,avarageRating} = req.body;
        const newMeal = new Meal({date,mealName,calories,avarageRating});
        await newMeal.save();
        res.status(201).json(newMeal);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const updateMealController = async (req,res) => {
   try {
    const {id} = req.params;
    const {date,mealName,calories,avarageRating} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:'Böyle bir yemek bulunamadı'});
    const updatedMeal = {date,mealName,calories,avarageRating,calories,_id:id};
    await Meal
    .findByIdAndUpdate(id,updatedMeal,{new:true});
    res.status(200).json(updatedMeal);
   } catch (error) {
    res.status(500).json({message:error.message});  
   }
};

const deleteMealController = async (req,res) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:'Böyle bir yemek bulunamadı'});
        await Meal.findByIdAndDelete(id);
        res.status(200).json({message:'Yemek silindi'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};


module.exports = {
    dayGetController,
    weekGetController,
    createMealController,
    updateMealController,
    deleteMealController,
    getMealController

};

