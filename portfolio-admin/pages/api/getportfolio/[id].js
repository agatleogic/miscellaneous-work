import connectDB from "../../../server/conection/connectDB"
import Portfolio from "../../../server/models/casestudiesSchema"
import NextCors from 'nextjs-cors';

async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    let portfolio = await Portfolio.findById(req.query.id)
    res.status(200).json({ portfolio:portfolio })

}

export default connectDB(handler)
