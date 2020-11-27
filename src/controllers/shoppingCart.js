import { shoppingCartModel } from '../models';
import shoppingCartRouter from '../routes/shoppingCart';


export const listItems = async (req, res, next) => {
  try {
    const data = await shoppingCartModel.select('*');
    res.status(200).json(data.rows);
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req, res, next) => {
  const { id, quantity } = req.body;
  const columns = 'id, quantity';
  const values = [id, quantity];

  try {
    const data = await shoppingCartModel.addItem(columns, values);
    const [addedItem] = data.rows;
    res.status(200).json(addedItem);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  const { id, quantity } = req.body;

  try {
    const data = await shoppingCartModel.updateItem(id, quantity);
    const [updatedItem] = data.rows;
    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req, res, next) => {
  const { id, clearEverything } = req.body;

  try {
    let data;
    if (clearEverything === undefined) {
      data = await shoppingCartRouter.clear();
    } else {
      data = await shoppingCartModel.deleteItem(id);
    }
    const { deletedItem } = data.rows;
    res.status(200).json(deletedItem);
  } catch(error) {
    next(error);
  }
};
