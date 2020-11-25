import { InventoryModel } from '../models';

const inventoryModel = new InventoryModel();

export const listProducts = async (req, res, next) => {
  try {
    const data = await inventoryModel.select('name, available_quantity, cost_per_unit');
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
    res.status(200).json({ inventory: data.rows });
  } catch (error) {
    next(error);
  }
};