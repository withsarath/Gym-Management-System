import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb is connected Successfully");    
    } catch (error) {
        console.log("MongoDb is not connected! Error occured!!!", error);
        process.exit(1)
    }
}
