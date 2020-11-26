import { InventoryModel } from '../models';

const inventoryModel = new InventoryModel();

export const listProducts = async (req, res, next) => {
  try {
    const data = await inventoryModel.select('id, name, available_quantity, cost_per_unit');
    res.status(200).json({ inventory: data.rows });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  const { name, available_quantity, cost_per_unit } = req.body;
  const columns = 'name, available_quantity, cost_per_unit';
  const values = [name, available_quantity, cost_per_unit];
  
  try{
    const data = await inventoryModel.insertProduct(columns, values);
    const [ addedProduct ] = data.rows;
    res.status(200).json( addedProduct );
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const { id, name, available_quantity, cost_per_unit } = req.body;
  const values = { name, available_quantity, cost_per_unit };
  
  try{
    const data = await inventoryModel.updateProductInfo(id, values);
    const [ updatedInfo ] = data.rows;
    res.status(200).json( updatedInfo );
  } catch(error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.body;

  try{
    const data = await inventoryModel.deleteProduct(id);
    const [ deletedProduct ] = data.rows;
    res.status(200).json( deletedProduct );
  } catch (error) {
    next(error);
  }
};

