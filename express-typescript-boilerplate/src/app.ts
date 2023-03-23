import express from 'express';
import createHttpError from 'http-errors';
import { db } from './database/db';
db();
import { PORT } from './config';
import { errorHandler } from './middleware/errorHandler';
import morgan from 'morgan';
import exampleRoutes from './routes/exampleRoutes';
const app = express();

var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", exampleRoutes);

app.use(() => {
    throw createHttpError(404, "Route Not Found")
})

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`server listen at port ${PORT}`)
})

// mongoose.connect(DB).then(() => {
//     console.log(`connect to DB`)
//     app.listen(PORT, () => {
//         console.log(`server listen at port ${PORT}`)
//     })
// }).catch(() => {
//     throw createHttpError(501, "Unable to connect DB")
// })