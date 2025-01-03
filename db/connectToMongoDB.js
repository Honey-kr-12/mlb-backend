import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
const connectToMongoDB = async () => {
    try {
        // process.env.MONGO_DB_URI
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB!!")

    } catch (error) {
        console.log("Error connecting to MOngoDB", error.message)
    }
}

export default connectToMongoDB;