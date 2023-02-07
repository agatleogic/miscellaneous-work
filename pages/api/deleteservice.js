import connectDB from "../../server/conection/connectDB"
import Services from "../../server/models/servicesSchema"

async function handler(req, res) {
    if (req.method == 'DELETE') {
        let service = await Services.deleteOne({ _id: req.query.delete })
        // console.log(service)
        res.status(200).json({ service })
    } else {
        res.status(400).json({ err: "this is error" })
    }
}

export default connectDB(handler)