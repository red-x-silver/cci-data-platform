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

export const updateDataset = async (req, res, next) => {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return next(errorHandler(404, 'Dataset not found!'));
    }
    if (req.user.id !== dataset.userRef) {
      return next(errorHandler(401, 'You can only update your own datasets!'));
    }
  
    try {
      const updatedDataset = await Dataset.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedDataset);
    } catch (error) {
      next(error);
    }

}


export const getDataset = async (req, res, next) => {
    try {
      const dataset = await Dataset.findById(req.params.id);
      if (!dataset) {
        return next(errorHandler(404, 'Dataset not found!'));
      }
      res.status(200).json(dataset);
    } catch (error) {
      next(error);
    }
  };
  
  export const getDatasets = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
  
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const datasets = await Dataset.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(datasets);
    } catch (error) {
      next(error);
    }
  };