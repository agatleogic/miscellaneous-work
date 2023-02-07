import connectDB from "../../server/conection/connectDB"
import caseStudiesSchema from "../../server/models/caseStudiesSchema"

async function handler(req, res) {
    const { title, image, description } = req.body
    if (req.method == 'POST') {

        let portfolio = new caseStudiesSchema({
            title,
            image,
            description,
        })
        let result = await portfolio.save()
        res.status(200).json({ result })
    } else {
        res.status(400).json({ err: "this is error" })
    }
}

export default connectDB(handler)
