import { shoppingCartModel } from '../models';

export const listItems = async (req, res, next) => {
  try {
    const data = await shoppingCartModel.select('*');
    res.status(200).json(data.rows);
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const { item_id, quantity } = req.body;
    const columns = 'item_id, quantity';
    const values = [item_id, quantity];
    const data = await shoppingCartModel.addItem(columns, values);
    const [addedItem] = data.rows;
    res.status(200).json(addedItem);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { item_id, quantity } = req.body;
    const data = await shoppingCartModel.updateItem(item_id, quantity);
    const [updatedItem] = data.rows;
    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const { item_id, clearEverything } = req.body;
    let data;
    if (clearEverything === undefined) {
      data = await shoppingCartModel.clear();
    } else {
      data = await shoppingCartModel.deleteItem(item_id);
    }
    const { deletedItem } = data.rows;
    res.status(200).json(deletedItem);
  } catch(error) {
    next(error);
  }
};
