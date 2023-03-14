import connectDB from "../../server/conection/connectDB"
import About from "../../server/models/aboutSchema"

async function handler(req, res) {
    if (req.method == 'DELETE') {
        let about = await About.findByIdAndDelete(req.body._id)
        if(about.title){
            res.status(200).json({ about })
        }else{
            res.status(404).json({ about })
        }
    } else {
        res.status(400).json({ err: "this is error" })
    }
}

export default connectDB(handler)
