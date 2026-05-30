import mongoose, { Schema, Document } from 'mongoose';

export interface IReview {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ICoffeeProduct extends Document {
  name: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  features: string[];
  reviews: IReview[];
  roastLevel: 'light' | 'medium' | 'dark';
  flavorNotes: string[];
  origin: string;
  slug: string;
  acidity: number;
  body: number;
  strength: number;
  sweetness: number;
  milkCompatible: boolean;
}

const ReviewSchema = new Schema<IReview>({
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: String, required: true, default: () => new Date().toISOString().split('T')[0] }
});

const CoffeeSchema = new Schema<ICoffeeProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  rating: { type: Number, required: true, default: 5 },
  image: { type: String, required: true },
  features: { type: [String], default: [] },
  reviews: { type: [ReviewSchema], default: [] },
  roastLevel: { type: String, enum: ['light', 'medium', 'dark'], required: true },
  flavorNotes: { type: [String], default: [] },
  origin: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  acidity: { type: Number, required: true, default: 3 }, // 1-5
  body: { type: Number, required: true, default: 3 }, // 1-5
  strength: { type: Number, required: true, default: 3 }, // 1-5
  sweetness: { type: Number, required: true, default: 3 }, // 1-5
  milkCompatible: { type: Boolean, required: true, default: true }
});

export default mongoose.models.Coffee || mongoose.model<ICoffeeProduct>('Coffee', CoffeeSchema);
