import User from "../model/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Resume from "../model/resume.js";


const generateToken=(userId)=>{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{expiresIn:"7d"});
    return token
}

//POST /api/users/register
export const registerUser = async (req, res) => {
    try {
        
        const {name,email,password} =req.body
        if(!name || !email|| !password){
            return res.status(400).json({message:"Missing Required Fields"})
        }
        //check User is exist or not
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User Already exists"})
        }

        //create new user
        const hash_password=await bcrypt.hash(password,10)
        const newuser=await User.create({
            name,
            email,
            password:hash_password
        })
        
        //success
        const token = generateToken(newuser._id);
        newuser.password=undefined

        return res
          .status(201)
          .json({ token,user: newuser, message: "User created Successfull" });
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }

}

//POST /api/users/login
export const loginUser = async (req, res) => {
    try {
        
        const {email,password} =req.body
        if(!email|| !password){
            return res.status(400).json({message:"Missing Required Fields"})
        }
        //check User is exist or not
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalied Email or password "})
        }

        //check the password is correct
        const passwordStatus=await bcrypt.compare(password,user.password)
        if(!passwordStatus){
            return res.status(400).json({message:"Password is wrong"})
        }

        //success
        const token = generateToken(user._id);
        user.password=undefined

        return res
          .status(200)
          .json({ token, user, message: "Login successful" });
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }

}


//getting the data by id
//GET: /api/users/data

export const getUserBYId = async (req, res) => {
    try {
        
        const userId=req.userId //come's from middleware
        //check the user exist or not
        const user=await User.findById(userId)
        if(!user){
           return res.status(404).json({message:"User Not Found"}) 
        }
        user.password=undefined

        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }

}


//getting the resumes

//GET : /api/users/resumes

export const getResumeByUserId = async (req, res) => {
  try {
    const userId = req.userId; //come's from middleware
    //check the user exist or not
    const userResume = await Resume.find({ userId });
    if (!userResume) {
      return res.status(404).json({ message: "Resume Not Found" });
    }
   
    return res.status(200).json({ resumes: userResume });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};






