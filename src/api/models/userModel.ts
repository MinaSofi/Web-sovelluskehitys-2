// TODO: mongoose schema for user
import {Schema, model} from 'mongoose';
import {User} from '../../interfaces/User';

const userSchema = new Schema<User>({
  user_name: {type: String, required: true, minlength: 2, unique: true},
  email: {type: String, required: true, minlength: 6, unique: true},
  role: {type: String, enum: ['admin', 'user']},
  password: {type: String, required: true, minlength: 5},
});

export default model<User>('User', userSchema);
