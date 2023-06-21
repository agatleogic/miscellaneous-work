import mongoose from "mongoose";

const connectToMongo = async () => {
    try {
     const conn = await mongoose.connect(process.env.MONGO_URI);
     if(conn) console.log(`connect to database`);
    } catch (error) {
      console.log(error);
    }
  };

  export default connectToMongo;