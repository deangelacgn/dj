import { productsModel } from '../models';

export const listProducts = async (req, res, next) => {
  try {
    const data = await productsModel.select('id, name, available_quantity, cost_per_unit');
    return res.status(200).json({ products: data.rows });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {  
  try{
    const { name, available_quantity, cost_per_unit } = req.body;
    const columns = 'name, available_quantity, cost_per_unit';
    const values = [name, available_quantity, cost_per_unit];
    const data = await productsModel.insertProduct(columns, values);
    const [addedProduct] = data.rows;
    return res.status(200).json(addedProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {  
  try{
    const { id, name, available_quantity, cost_per_unit } = req.body;
    const values = { name, available_quantity, cost_per_unit };
    const data = await productsModel.updateProductInfo(id, values);
    const [updatedInfo] = data.rows;
    return res.status(200).json(updatedInfo);
  } catch(error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try{
    const { id } = req.body;
    const data = await productsModel.deleteProduct(id);
    const [deletedProduct] = data.rows;
    return res.status(200).json(deletedProduct);
  } catch (error) {
    next(error);
  }
};

