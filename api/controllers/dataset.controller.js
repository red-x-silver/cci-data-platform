import Dataset from '../models/dataset.model.js';
import { errorHandler } from '../utils/error.js';

export const createDataset= async (req, res, next) => {
    try {
        const dataset = await Dataset.create(req.body);
        return res.status(201).json(
            dataset
        );
    } catch (error) {
        next(error);
    }
}


export const deleteDataset = async (req, res, next) => {
    const dataset = await Dataset.findById(req.params.id);

  if (!dataset) {
    return next(errorHandler(404, 'Dataset not found!'));
  }

  if (req.user.id !== dataset.userRef) {
    return next(errorHandler(401, 'You can only delete your own datasets!'));
  }

  try {
    await Dataset.findByIdAndDelete(req.params.id);
    res.status(200).json('Dataset has been deleted!');
  } catch (error) {
    next(error);
  }
}