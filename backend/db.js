import mongoose from "mongoose";
const mongoURI = "mongodb://localhost:27017/";
const connectToMongo = async ()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    }
    catch(e){
        console.log("connection failed with mongoDB",e.message);
    }
  
};
export default connectToMongo;