import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    visual: {
        type: Boolean,
        required: true,
    },

    textual: {
        type: Boolean,
        required: true,
    },

    auditory: {
        type: Boolean,
        required: true,
    },
    otherModality: {
        type: Boolean,
        required: true,
    },

    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    downloadLink: {
        type: String,
        default: "https://www.google.com/"
    },
    userRef:{
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true
    },
    tasks: {
        type: String,
        default: "image classification"
    },
    tags: {
        type: String,
        default: ""
    },
    imageUrls: {
        type: Array,
        default: []
    },
}, {timestamps: true});

const Dataset = mongoose.model('Dataset', datasetSchema);

export default Dataset;