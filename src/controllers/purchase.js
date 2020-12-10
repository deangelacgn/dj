import { purchaseModel } from '../models';
import { shoppingCartModel } from '../models';

export const getTotalPurchaseCost = async (req, res, next) => {
  try {
    const data = await purchaseModel.computeTotalCost();
    return res.status(200).json( data.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const finishPurchase = async (req, res, next) => {
  try {
    const { customer_name } = req.body;
    const vendor_name = req.user.name;

    const timestamp = new Date();
    const columns = 'customer_name, vendor_name, timestamp';
    const values = [customer_name, vendor_name, timestamp];
    const total_cost = await purchaseModel.computeTotalCost();

    const [purchase_data] = await Promise.all([
      purchaseModel.addPurchaseToHistory(columns, values),
      shoppingCartModel.clear(),
    ]);
    return res.status(200).json({
      total_cost: total_cost,
      costumer_name: customer_name,
      vendor_name: vendor_name,
      purchase_id: purchase_data[0],
    });
  } catch (error) {
    next(error);
  }
};

