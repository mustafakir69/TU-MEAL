const User = require("../model/User");
const bcrypt =require("bcryptjs");
const {sendVerificationEmail}=require("../utils/sendEmail");
const jwt=require("jsonwebtoken");
const {accessToken,refreshToken,verifyEmailToken}=require("../config/jwtConfig");
const RefreshToken = require("../model/RefreshToken");
const session =require("express-session");
require("dotenv").config();

const generateTokens = (user) => {
  const accessTokenPayload = { email: user.email ,password:user.password };
  const refreshTokenPayload = { id: user.id };

  const newAccessToken = jwt.sign(accessTokenPayload, accessToken.secret, {
    expiresIn: accessToken.expiresIn,
  });

  const newRefreshToken = jwt.sign(refreshTokenPayload, refreshToken.secret, {
    expiresIn: refreshToken.expiresIn,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // email eşleme
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Böyle bir kullanıcı bulunamadı" });
    }
    //şifre eşleme
    const validPassword= await bcrypt.compare(password,user.password);
    if (!validPassword) { 
    return res.status(404).json({message:"şifre yanlış"});
    }
      if (user.isVerified === false) {
        sendVerificationEmail(user.email, user.verificationToken);
        return res.status(401).json({message:"lütfen email doğrulaması yapın"});
      }

    // Kullanıcının eski tüm refresh tokenlarını sil
    await RefreshToken.deleteMany({ userId: user._id });

    //jwt token oluştur
   const tokens =generateTokens(user);

   //save refresh token
   const refreshToken = new RefreshToken({userId:user._id,token:tokens.refreshToken});
    await refreshToken.save();

      // Cookie'leri ayarla
      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 dakika
      });
  
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
      });
      // Kullanıcı oturumunu başlat
      req.session.user = { firstName: user.firstName, lastName: user.lastName, email: user.email };
      res.redirect("/home");
      // res.json({
      // message: `Giriş başarılı, hoşgeldin ${user.firstName}`,
      // user: user,
      // tokens,
      // });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerController = async (req, res,next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // email konnrolu yapıldı
    const validEmail = await User.findOne({email:req.body.email});
    if (validEmail) {
      return res.status(400).json({message:"boyle bir kullanıcı zaten var!"})
    }
    //şifre hashleme
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password,salt)
    // verify token hazırlanısı
  
    const verificationToken = jwt.sign({ email }, verifyEmailToken.secret, {expiresIn:verifyEmailToken.expiresIn});
    // veri db ye gider
    const user = new User({ firstName, lastName, email, password:hashedPassword,verificationToken});
    const newUser = await user.save();
    // verify edileme maili

    try {
      await sendVerificationEmail(email, verificationToken);
      console.log("basaşalı token maili gönderildi"); 
    } catch (error) {
      console.log("basarısız");
    }
    // Hoş geldiniz e-postası gönder
    // try {
    //   await sendEmail(email,firstName);
    //   console.log("E-posta başarıyla gönderildi:",email);
    // } catch (error) {
    //   console.log("E-posta gönderme hatası:", error);
    // }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const refreshTokens = async (req, res) => {
  try {
    const oldRefreshToken = req.body.refreshToken;
    console.log(req.user);
   
    // Remove old refresh token
    await RefreshToken.deleteOne({ token: oldRefreshToken });

    // Generate new tokens
    const tokens = generateTokens(req.user);

    // Save new refresh token
    await RefreshToken.create({
      userId: req.user.id,
      token: tokens.refreshToken,
    });

    // Set cookies
    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/refresh-token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ message: "Tokens refreshed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.cookies.accessToken;
    if (refreshToken) {
      await RefreshToken.deleteOne({token :refreshToken});
    }

    // Clear cookies
    const toki = 
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken",{path:"/"});


    res.json({ message: "Logged out successfully : tokenler silindi", refToken:refreshToken ,accToken: accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//  get login get register
const loginGet= async (req,res)=>{
  // "index.ejs" sayfasını render et
  res.render('login', {
    title: 'Öğrenci Yönetim Sistemi', // Başlık verisi
    message: 'Hoşgeldiniz!' // Mesaj verisi
});
};
const registerGet= async (req,res)=>{
   // "index.ejs" sayfasını render et
   res.render('register', {
    title: 'Öğrenci Yönetim Sistemi', // Başlık verisi
    message: 'Hoşgeldiniz!' // Mesaj verisi
});
};

module.exports = {
  loginController,
  registerController,
  refreshTokens,
  logout,
  loginGet,
  registerGet
};
