import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  userId: string;
  email: string;
  plan: 'starter' | 'premium' | 'artisan';
  status: 'active' | 'paused' | 'cancelled';
  frequency: 'weekly' | 'biweekly' | 'monthly';
  coffeePreference: 'espresso' | 'filter' | 'decaf' | 'roaster-choice';
  nextDeliveryDate: Date;
  createdAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  plan: {
    type: String,
    enum: ['starter', 'premium', 'artisan'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'cancelled'],
    default: 'active'
  },
  frequency: {
    type: String,
    enum: ['weekly', 'biweekly', 'monthly'],
    default: 'monthly'
  },
  coffeePreference: {
    type: String,
    enum: ['espresso', 'filter', 'decaf', 'roaster-choice'],
    default: 'roaster-choice'
  },
  nextDeliveryDate: {
    type: Date,
    default: () => {
      const now = new Date();
      now.setDate(now.getDate() + 30); // 30 days from now
      return now;
    }
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
