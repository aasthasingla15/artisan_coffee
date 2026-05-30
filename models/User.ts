import mongoose, { Schema, Document } from 'mongoose';

export interface Address {
  fullName: string;
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'user' | 'admin';
  favorites: string[];
  wishlist: string[];
  addresses: Address[];
  refreshTokens: string[];
  createdAt: Date;
}

const AddressSchema = new Schema<Address>({
  fullName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true }
});

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String },
  image: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  favorites: { type: [String], default: [] },
  wishlist: { type: [String], default: [] },
  addresses: { type: [AddressSchema], default: [] },
  refreshTokens: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
