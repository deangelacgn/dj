import { inventoryModel } from '../models';

export const searchProduct = async (req, res, next) => {
  const { search_pattern, num_results, offset } = req.body;
  try {
    const searchResults = await inventoryModel.searchProduct(search_pattern, num_results, offset);
    res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
};