import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
},{
    timestamps:true,
}
)
userSchema.methods.comparePassword=function (password){
    return bcrypt.compareSync(password,this.password)
}

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User