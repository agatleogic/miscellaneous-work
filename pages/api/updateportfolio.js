import connectDB from "../../server/conection/connectDB"
import casestudiesSchema from "../../server/models/casestudiesSchema"

async function handler(req, res) {
    if (req.method == 'PUT') {
        let portfolio = await casestudiesSchema.findByIdAndUpdate(req.body._id, req.body)
        res.status(200).json({ portfolio })
    } else {
        res.status(400).json({ err: "this is error" })
    }
}

export default connectDB(handler)
