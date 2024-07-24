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