import { productsModel } from '../models';

export const searchProduct = async (req, res, next) => {
  try {
    const { search_pattern, num_results, offset } = req.query;
    
    const searchResults = await productsModel.searchProduct(search_pattern, num_results, offset);
    return res.status(200).json(searchResults.rows);
  } catch (error) {
    next(error);
  }
};