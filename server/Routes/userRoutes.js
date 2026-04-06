import express from "express"
import {
    getResumeByUserId,
  getUserBYId,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";

const UserRouter=express.Router()

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/data",protect, getUserBYId);
UserRouter.get("/resumes", protect, getResumeByUserId);



export default UserRouter;