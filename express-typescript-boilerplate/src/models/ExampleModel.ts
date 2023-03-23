import { Document, model, Schema } from "mongoose";

export interface IExample extends Document {
    name: string;
    id: number;
}

const ExampleSchema: Schema = new Schema({
    name: { type: String },
    id: { type: Number },
})

export default model<IExample>("Example", ExampleSchema)