import { inventoryModel } from '../models';

export const listProducts = async (req, res, next) => {
  try {
    const data = await inventoryModel.select('product_id, name, available_quantity, cost_per_unit');
    return res.status(200).json({ inventory: data.rows });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {  
  try{
    const { name, available_quantity, cost_per_unit } = req.body;
    const columns = 'name, available_quantity, cost_per_unit';
    const values = [name, available_quantity, cost_per_unit];
    const data = await inventoryModel.insertProduct(columns, values);
    const [addedProduct] = data.rows;
    return res.status(200).json(addedProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {  
  try{
    const { product_id, name, available_quantity, cost_per_unit } = req.body;
    const values = { name, available_quantity, cost_per_unit };
    const data = await inventoryModel.updateProductInfo(product_id, values);
    const [updatedInfo] = data.rows;
    return res.status(200).json(updatedInfo);
  } catch(error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try{
    const { product_id } = req.body;
    const data = await inventoryModel.deleteProduct(product_id);
    const [deletedProduct] = data.rows;
    return res.status(200).json(deletedProduct);
  } catch (error) {
    next(error);
  }
};

