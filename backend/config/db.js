import mongoose from "mongoose";
const url = process.env.MONGO_URL;

const connectDB = async()=> {

    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log('MongoDB connection error:', err));
      
}

export default connectDB