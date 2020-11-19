import Model from '../models/model';

const messagesModel = new Model('messages');

export const messagesPage = async (req, res, next) => {
  try {
    const data = await messagesModel.select('name, message', `WHERE $1=` , req.body);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    next(err);
  }
};

export const addMessage = async (req, res, next) => {
  const { name, message } = req.body;
  const columns = 'name, message';
  const values = [name, message];
  try {
    const data = await messagesModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    next(err);
  }
};