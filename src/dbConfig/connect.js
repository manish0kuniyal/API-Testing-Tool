const mongoose = require('mongoose');
const url="mongodb+srv://betting1234:betting1234@cluster0.5szeytj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('...Connected to DB');
  } catch (err) {mongodb://localhost:27017
    console.error('Error connecting to DB:', err);
    process.exit(1); 
  }
};

module.exports = connectDB;