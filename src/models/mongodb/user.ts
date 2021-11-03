import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IntUser } from 'common/interfaces';

const Schema = mongoose.Schema;

const UserSchema = new Schema<IntUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  photo: { type: String, required: true },
  cart: {
    type: 'ObjectId',
    ref: 'Cart',
  },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const comparePass = await bcrypt.compare(password, this.password);
  return comparePass;
};

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const UserModel = mongoose.model<IntUser>('User', UserSchema);
