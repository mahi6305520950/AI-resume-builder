import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("Database is connected SuccessFully");
        })
        let mongodburl = process.env.MONGOSDB_URL;
        const projectName = "resume-builder";
        if (!mongodburl) {
          throw new Error("MONGODB_URI environment variable not set");
        }
        if (mongodburl.endsWith("/")) {
          mongodburl = mongodburl.slice(0, -1);
        }

        await mongoose.connect(`${mongodburl}/${projectName}`);
        
    } catch (error) {
        process.exit(1)
        console.log("DataBase connection error",error) 
    }

}

export default connectDB;