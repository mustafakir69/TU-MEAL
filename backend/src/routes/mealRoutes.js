const express = require('express');
const router = express.Router();
const {dayGetController,weekGetController,createMealController,updateMealController,deleteMealController,getMealController} = require('../controller/mealController');

// GET 
router.get('/day',dayGetController);
router.get('/week',weekGetController);

// CRUD
router.get('/',getMealController);
router.post('/',createMealController);
router.put('/:id',updateMealController);
router.delete('/:id',deleteMealController);

module.exports = router;