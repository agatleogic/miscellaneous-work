import connectDB from "../../connection/db";
import Cloud from "../../models/cloud";

async function handler(req, res) {
  if (req.method == "POST") {
    console.log(req.body);
    const { title, image, description } = req.body;
    if (!title || !image || !description) {
      return res.status(400).json({ message: "bad request" });
    }
    const images = new Cloud({
      title,
      image,
      description,
    });

    const result = await images.save();

    res.status(200).json({ result });
  }else{

    res.status(404).json({ message: "bad request" });
  }
}

export default connectDB(handler);
