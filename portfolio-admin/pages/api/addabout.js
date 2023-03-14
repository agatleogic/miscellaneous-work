import connectDB from "../../server/conection/connectDB";
import AboutSchema from "../../server/models/aboutSchema";

async function handler(req, res) {
  if (req.method == "POST") {
    // console.log(req.body);
    const { seotitle, seodescription, seoTags, title, heading, image, years, feedback, feedbackProvider, designation, shortdescription, description, texteditor } = req.body;

    const about = new AboutSchema({ seotitle, seodescription, seoTags, title, heading, image, years, feedback, feedbackProvider, designation, shortdescription, description, texteditor });

    const result = await about.save();

    res.status(201).json({ result });
  } else {
    res.status(404).json({ message: "bad request" });
  }
}

export default connectDB(handler);
