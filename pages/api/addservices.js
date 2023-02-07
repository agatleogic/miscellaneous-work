import Services from "../../server/models/servicesSchema"
import connectToDatabase from '../../server/conection/mongodb';
import nc from 'next-connect';
import multer from 'multer';
import path from 'path'

export const config = {
    api: {
        bodyParser: false
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, res, cb) {
            cb(null, path.join(process.cwd(), 'public', 'uploads'))
        },
        filename: function (req, file, cb) {
            cb(null, new Date().getTime() + "-" + file.originalname)
        },
    }),
})

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack)
        res.status(500).end("Somthing broke !")
    },
    onNoMatch: (err, req, res, next) => {
        res.status(404).end("page is not found !")
    },
}).use(upload.single("image"))
    .post(async (req, res) => {

        console.log(req.body)
        console.log(req.file)
        try {
            const url = "http://127.0.0.1:3000/public/uploads" + req.file.filename
            const post = new Services({
                title: req.body.title,
                shortdescription: req.body.shortdescription,
                description: req.body.description,
                image: url
            })
            await connectToDatabase();
            const savepost = await post.save()
            if (savepost) {

                res.status(201).json({ savepost, res })
            }
            else {

                res.status(404).json({ savepost, res })
            }
        } catch (err) {
            console.log(err)
            res.status(404).json({ err, res })
        }
    }
        // res.status(201).json({ body: req.body, file: req.file })
    )

export default handler;