import nc from "next-connect";
// import multer from "multer";
// import path from "path";
import onError from "../../../common/errorMiddleware";
import { executeQuery } from "../../../connection/db";
// const handler = nc();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const handler = nc({ onError });

// let storage = multer.memoryStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "/public");
//   },
//   filename: function (req, file, cb) {
//     return cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// let upload = multer({
//   storage,
// });

// let uploadFIle = upload.single("file");

// handler.use(uploadFIle);

handler.post(async (req, res) => {
//   console.log(req.file);
//   console.log(req.body);

  //   const url = `http//:${req.headers.host}`;

  //   const image = req.file.filename;
    const image = req.body.image;
    const title = req.body.title;
    const result = await executeQuery(
      `insert into filecontainer(title, image) value(?, ?)`,
      [title, image]
    );

    result = await executeQuery(
      `select * from filecontainer where id=${result.insertId}`
    );

    res.status(200).json({ result, url: url + "/public" + req.file.filename });
});

export default handler;
