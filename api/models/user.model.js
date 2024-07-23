import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type:String,
        default:"https://wiki.cci.arts.ac.uk/uploads/images/gallery/2024-02/scaled-1680-/QIDK6deUudbGAezL-mirror.png"
    },

}, {timestamps: true}); 

const User = mongoose.model('User', userSchema); 

export default User;