import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

//Entry Point

//Load Environment Variables from .env file
dotenv.config();
//Call the connectDB function to connect to Atlas MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

//Start the server on the specified port
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

//Key Idea:
//Boots backend server, just setup and start the server
