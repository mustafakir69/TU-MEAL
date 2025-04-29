const Meal = require("../model/Meal");
const Comment =require("../model/Comment");
const RefreshToken = require("../model/RefreshToken");


const userCommentPost= async(req,res)=>{
    try {
        const {mealId, text, rating } = req.body;
        const token =req.cookies.refreshToken;
        let user = await RefreshToken.findOne({ token: token });
   
        // Yorum yapılan yemeği 
        const meal = await Meal.findById(mealId);
    
        if (!meal || !user) {
          return res.status(400).json({ error: 'Yemek veya kullanıcı bulunamadı.' });
        }
    
        // Yeni yorumu oluştur
        const newComment = new Comment({
          userId: user.userId,
          mealId: meal._id,
          text,
          rating,
        });
    
        // Yorum veritabanına kaydediliyor
        await newComment.save();
    
        res.status(201).json({
          message: 'Yorum başarıyla eklendi.',
          yemek : meal.mealName,
          comment: newComment,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Yorum eklenirken bir hata oluştu.' });
      }
};
const userCommentGet= async(req,res)=>{
    try {
        const commets = await Comment.find();
        res.status(200).json(commets); 
    } catch (error) {
        res.status(404).json({message:error});
    }
};

module.exports={
    userCommentPost,
    userCommentGet
}