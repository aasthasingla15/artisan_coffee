import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  coffeeId: string;
  name: string;
  quantity: number;
  price: number; // Single item price as number
}

export interface IOrder extends Document {
  userId?: string;
  email: string;
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
  status: 'received' | 'preparing' | 'brewing' | 'ready'; // Order tracking steps
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  coffeeId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
});

const OrderSchema = new Schema<IOrder>({
  userId: { type: String }, // Optional for guest checkouts
  email: { type: String, required: true },
  items: { type: [OrderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['received', 'preparing', 'brewing', 'ready'],
    default: 'received'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp hook
OrderSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
