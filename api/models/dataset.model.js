import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
        required: true
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
    coverImage: {
        type:String,
        default:"https://wiki.cci.arts.ac.uk/uploads/images/gallery/2024-02/scaled-1680-/QIDK6deUudbGAezL-mirror.png"
    },
    imageUrls: {
        type: Array,
        default: []
    },
}, {timestamps: true});

const Dataset = mongoose.model('Dataset', datasetSchema);

export default Dataset;