
const Meal = require('../model/Meal');

const userRateMeal= async (req, res) => {
    try {
        const { mealId, userId, rating } = req.body; // mealId, userId ve rating'i body'den al

        // Meal verisini getir
        const meal = await Meal.findById(mealId);
        if (!meal) {
            return res.status(404).json({ message: "Yemek bulunamadı" });
        }

        // Kullanıcının daha önce puan verip vermediğini kontrol et
        const existingRating = meal.ratings.find(r => r.userId.toString() === userId.toString());

        if (existingRating) {
            return res.status(400).json({ message: "bu kullanıcı puanlama yapmış zaten" });
        }

        // Yeni puanı ekle
        meal.ratings.push({ userId, rating });
        meal.totalRating += rating;
        meal.totalUsersRated += 1;

        // Ortalama puanı güncelle
        meal.avarageRating = (meal.totalRating / meal.totalUsersRated).toFixed(2);

        // Güncellenmiş veriyi kaydet
        await meal.save();

        res.status(200).json({ message: "başarılı rate atıldı", meal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { userRateMeal};  