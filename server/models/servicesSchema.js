import mongoose from 'mongoose'

const ServicesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: Buffer, required: true },
    shortdescription: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true })

mongoose.models = {}

export default mongoose.model('Services', ServicesSchema)