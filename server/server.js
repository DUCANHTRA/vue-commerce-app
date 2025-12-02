import dotenv from 'dotenv';
import app from './app.js';

//Entry Point

//Load Environment Variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

//Start the server on the specified port
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

//Key Idea:
//Boots backend server, just setup and start the server
