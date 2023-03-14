import connectDB from "../../server/conection/connectDB"
import casestudiesSchema from "../../server/models/casestudiesSchema"

async function handler(req, res) {
    if (req.method == 'DELETE') {
        let portfolio = await casestudiesSchema.findByIdAndDelete(req.body._id)
        if(portfolio.title){
            res.status(200).json({ portfolio })
        }else{
            res.status(404).json({ portfolio })
        }
    } else {
        res.status(400).json({ err: "this is error" })
    }
}

export default connectDB(handler)
