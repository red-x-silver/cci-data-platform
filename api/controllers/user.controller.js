import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Dataset from '../models/dataset.model.js';

export const test=(req, res) => {
    res.json({message: 'user api route is working'});
}

//update user profile information
export const updateUser= async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(403, 'You are not authorized to update this user'));
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,

            }
        }, {new: true})

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);

        
    } catch (error) {
        next(error);
    }
};

//delete user profile information
export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You are not authorized to delete this user'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token'); //this has to happen before the next line
        res.status(200).json({message: 'User has been deleted'});
    } catch (error) {
        next(error);
    }
};

//retrieve the datasets uploaded by a user
export const getUserDatasets = async (req, res, next) => {

    if (req.user.id === req.params.id) {
        try {
          const datasets = await Dataset.find({ userRef: req.params.id });
          res.status(200).json(datasets);
        } catch (error) {
          next(error);
        }
      } else {
        return next(errorHandler(401, 'You can only view your own datasets!'));
      }
}