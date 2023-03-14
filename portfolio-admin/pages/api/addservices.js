import connectDB from "../../server/conection/connectDB";
import ServicesSchema from "../../server/models/servicesSchema";

async function handler(req, res) {
  if (req.method == "POST") {
    // console.log(req.body);
    const {
      seotitle,
      seodescription,
      seoTags,
      title,
      shortdescription,
      image,
      description,
      texteditor,
    } = req.body;
    const service = new ServicesSchema({
      seotitle,
      seodescription,
      seoTags,
      title,
      image,
      shortdescription,
      description,
      texteditor,
    });

    const result = await service.save();

    res.status(201).json({ result });
  } else {
    res.status(404).json({ message: "bad request" });
  }
}

export default connectDB(handler);
