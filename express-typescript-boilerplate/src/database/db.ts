import createHttpError from "http-errors"
import mongoose from "mongoose"
import { DB } from "../config"

export const db =()=> mongoose.connect(DB).then(() => {
    console.log(`connect to DB`)
}).catch(() => {
    throw createHttpError(501, "Unable to connect DB")
})