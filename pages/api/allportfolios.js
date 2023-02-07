import connectDB from "../../server/conection/connectDB"
import caseStudiesSchema from "../../server/models/caseStudiesSchema"
import NextCors from 'nextjs-cors';

async function handler(req, res, handler) {
    // if(req.method==="GET"){
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
    let portfolio = await caseStudiesSchema.find({})
    res.status(200).json({ portfolio })
    // }else{
    //     res.status(400).json({ err: "this is error" })
    // }
}

export default connectDB(handler)
