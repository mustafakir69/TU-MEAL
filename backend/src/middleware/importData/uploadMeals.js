const mongoose = require("mongoose");
const fs = require("fs").promises;
const Meal = require("../../model/Meal"); // Meal şemanı import et
require("dotenv").config;
// MongoDB'ye bağlan
mongoose.connect(process.env.MONGO_URI, {
});

async function uploadMeals() {
  try {
    // JSON dosyasını oku
    const data = await fs.readFile("meals.json", "utf8");
    const meals = JSON.parse(data);

    // Önce eski verileri temizleyelim (Eğer eskileri silmek istemiyorsan bu kısmı kaldır)
    await Meal.deleteMany({});
    console.log("Eski veriler silindi!");

    // Yeni verileri ekleyelim
    await Meal.insertMany(meals);
    console.log("Veriler başarıyla eklendi!");

    // MongoDB bağlantısını kapat
    mongoose.connection.close();
  } catch (error) {
    console.error("MongoDB ekleme hatası:", error);
    mongoose.connection.close();
  }
}

// Fonksiyonu çalıştır
uploadMeals();