// TODO: mongoose schema for user
import {Schema, model} from 'mongoose';
import {User} from '../../interfaces/User';

const userSchema = new Schema<User>({
  _id: {type: String, required: true, unique: true},
  user_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, enum: ['admin', 'user'], required: true},
  password: {type: String, required: true},
});

export default model<User>('User', userSchema);
