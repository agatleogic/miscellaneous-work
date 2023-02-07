import mongoose from "mongoose";

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    const MONGODB_URI = process.env.MONGODB_URI
    const option = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      }
    await mongoose.connect(MONGODB_URI)
    return handler(req, res)
}
export default connectDB;