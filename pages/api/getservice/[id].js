import connectDB from "../../../server/conection/connectDB"
import Services from "../../../server/models/servicesSchema"
import NextCors from 'nextjs-cors';

async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    let services = await Services.findById(req.query.id)
    res.status(200).json({ services:services })

}

export default connectDB(handler)
