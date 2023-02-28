import connectDB from "../../server/conection/connectDB";
import caseStudiesSchema from "../../server/models/caseStudiesSchema";

async function handler(req, res) {
  if (req.method == "POST") {
    // console.log(req.body);
    const { title, shortdescription, image, description, texteditor } =
      req.body;
    const portfolio = new caseStudiesSchema({
      title,
      image,
      shortdescription,
      description,
      texteditor,
    });

    const result = await portfolio.save();

    res.status(201).json({ result });
  } else {
    res.status(404).json({ message: "bad request" });
  }
}

export default connectDB(handler);