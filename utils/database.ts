import { ConnectionOptions } from "mongodb";
import mongoose from "mongoose";

let isConnected = false; //? track the connection state

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('mongoose is connected');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        }
            // as ConnectionOptions
        );
    } catch (error) {
        console.log(error);
    }
}