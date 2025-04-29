const jwt = require("jsonwebtoken");
const User =require("../model/User")
const {accessToken,refreshToken,verifyEmailToken} =require("../config/jwtConfig");
const RefreshToken= require("../model/RefreshToken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(401).json({message:"Token gerekli!"});
    }
    // token doğrulama
    const decoded = jwt.verify(token,verifyEmailToken.secret);
    req.user = decoded;
    next();
    } catch (error) {
      res.status(400).json({message:"geçersiz veya süresi dolmuş token!"})
    }
};
// E-posta Doğrulama
const verifyEmail = async (req, res) => {
  try {
    // params üzerinden gelen token'ı al
    const token = req.params.token;

    // Token'ı decode et
    const decoded = jwt.verify(token, verifyEmailToken.secret);
    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(400).json({ message: "Kullanıcı bulunamadı." });
    if (user.isVerified) return res.status(400).json({ message: "Hesap zaten doğrulanmış." });

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: "Hesap başarıyla doğrulandı!" });
  } catch (err) {
    res.status(400).json({ message: "Geçersiz veya süresi dolmuş token." });
  }
};
// verfy 2
const verifyToken2 = async (req, res, next) => {
  const authHeader =req.headers["authorization"];
  const token =authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({message:"Token gerekli!"});
  }
  try {
    // token doğrulama
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
    } catch (error) {
      res.status(401).json({message:"Geçersiz token"})
    }
}; 

const verifyAccessToken = (req, res, next) => {
  const token =req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "tokenin yok" });
  }

  try {
    const decoded = jwt.verify(token, accessToken.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "tokenin yok" });
  }
};

const verifyRefreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;

  if (!token) {
    return res.status(403).json({ message: "Refresh token required" });
  }

  try {
    const storedToken = RefreshToken.findOne(token);
    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const decoded = jwt.verify(token, refreshToken.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};
module.exports={
  verifyToken,
  verifyEmail,
  verifyToken2,
  verifyAccessToken,
  verifyRefreshToken
};