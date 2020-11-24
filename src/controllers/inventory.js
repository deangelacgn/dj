import Model from '../models/model';

const inventoryModel = Model('inventory');

export const listProducts = async (req, res, next) => {
  try {
    const data = await inventoryModel.select('name, available_quantity, cost_per_unit');
    res.status(200).json({ inventory: data.rows });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  const { name, quantity, costPerUnit } = req.body;
  const columns = 'name, available_quantity, cost_per_unit';
  const values = [name, quantity, costPerUnit];
  try{
    const data = await inventoryModel.insertWithReturn(columns, values);
    res.status(200).json({ inventory: data.rows });
  } catch (error) {
    next(error);
  }
};