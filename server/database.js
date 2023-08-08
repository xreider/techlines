import mongoose from 'mongoose';

const connectToDatabase = async () => {
  console.log(process.env.MONGO_URI);

  try {
    mongoose.set('strictQuery', false);
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: false,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectToDatabase;
