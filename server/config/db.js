//config/db.js
import mongooes from 'mongoose';

const connectDB = async () => {
    try {
        //Use mongooes to connect to the MongoDB Atlas database
        const conn = await mongooes.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        //If failed,
        //print error maessage
        //exit the process with a failure code
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;

//Key Idea:
//Handle Database connectivity in one place
//Any part of the application can import
//To ensure db is connected
