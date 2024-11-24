import { Model, ObjectId } from "mongoose";

export interface IOrder {
   email: string;
   product: ObjectId;
   quantity: number;
   totalPrice: number;
}

export interface IOrderModel extends Model<IOrder> {
   // eslint-disable-next-line no-unused-vars
   isOrderExist(id: string): Promise<IOrder | null>;
}
