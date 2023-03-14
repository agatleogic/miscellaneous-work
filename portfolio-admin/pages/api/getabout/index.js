import connectDB from "../../../server/conection/connectDB"
import About from "../../../server/models/aboutSchema"
import NextCors from 'nextjs-cors';

async function handler(req, res) {

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    let about = await About.find({})
    res.status(200).json({ about })

}

export default connectDB(handler)
