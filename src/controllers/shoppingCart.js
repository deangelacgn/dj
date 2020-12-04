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
    const { id, quantity } = req.body;
    const columns = 'id, quantity';
    const values = [id, quantity];
    const data = await shoppingCartModel.addItem(columns, values);
    const [addedItem] = data.rows;
    return res.status(200).json(addedItem);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { id, quantity } = req.body;
    const data = await shoppingCartModel.updateItem(id, quantity);
    const [updatedItem] = data.rows;
    return res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const { id, clearEverything } = req.body;
    let data;
    if (clearEverything === true) {
      data = await shoppingCartModel.clear();
    } else {
      data = await shoppingCartModel.deleteItem(id);
    }
    const { deletedItem } = data.rows;
    return res.status(200).json(deletedItem);
  } catch(error) {
    next(error);
  }
};
