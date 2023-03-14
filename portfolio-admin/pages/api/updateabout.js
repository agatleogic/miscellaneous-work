import connectDB from "../../server/conection/connectDB";
import About from "../../server/models/aboutSchema";

async function handler(req, res) {
  if (req.method == "PUT") {
    let about = await About.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json({ about });
  } else {
    res.status(400).json({ err: "this is error" });
  }
}

export default connectDB(handler);
