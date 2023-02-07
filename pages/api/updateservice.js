import connectDB from "../../server/conection/connectDB"
import Services from "../../server/models/servicesSchema"

async function handler(req, res) {
    if (req.method == 'PUT') {
        let service = await Services.findByIdAndUpdate(req.body._id, req.body)
        res.status(200).json({ service })
    } else {
        res.status(400).json({ err: "this is error" })
    }
}

export default connectDB(handler)
