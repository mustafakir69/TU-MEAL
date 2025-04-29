const User =require("../model/User");

const getProfile= async(req,res)=>{
   try {
        const users = await User.find();
      res.render("tables",{users})
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
};
module.exports={
    getProfile
}