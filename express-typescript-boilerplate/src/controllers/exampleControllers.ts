import { RequestHandler } from "express";
import createHttpError from "http-errors";
import ExampleModel from "../models/ExampleModel";

export const getExample: RequestHandler = (req, res, next) => {
    next()
    res.json({ message: "hello, i am exampleControllers" })
}
export const getExampleData: RequestHandler = async (req, res, next) => {
    const { name, id }: IExampleData = req.body;
    try {
    const example = await ExampleModel.findOne({ name })
    if (example) return next(createHttpError(406, "user already exists"))

    const newExamplle = new ExampleModel({ name, id })
    const result = await newExamplle.save();
    res.json({ message: "user added successfully", result })

    } catch (error) {
        return next(createHttpError.InternalServerError)
    }
}