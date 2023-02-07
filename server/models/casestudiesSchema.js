import mongoose from 'mongoose'

const caseStudiesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    images: { type: Array, required: true },
    shortdescription: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true })

mongoose.models = {}

export default mongoose.model('Casestudies', caseStudiesSchema)