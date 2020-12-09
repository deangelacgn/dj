import { shoppingCartModel } from '../models';

export const listItems = async (req, res, next) => {
  try {
    const data = await shoppingCartModel.select('*');
    return res.status(200).json(data.rows);
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { product_id } = req.params;

    const columns = 'product_id, quantity';
    const values = [product_id, quantity];
    const data = await shoppingCartModel.addItem(columns, values);
    const [addedItem] = data.rows;
    return res.status(200).json(addedItem);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { product_id } = req.params;

    const data = await shoppingCartModel.updateItem(product_id, quantity);
    const [updatedItem] = data.rows;
    return res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const { product_id } = req.params;

    const data = await shoppingCartModel.removeItem(product_id);
    const [deletedItem] = data.rows;

    if (deletedItem === undefined) {
      return res.status(404).json({ message: "Item id does not exist!" });
    }
    return res.status(200).json(deletedItem);
  } catch(error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const data = await shoppingCartModel.clear();
    const [deletedItem] = data.rows;
    
    return res.status(200).json(deletedItem);
  } catch(error) {
    next(error);
  }
};
