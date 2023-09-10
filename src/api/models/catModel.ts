// TODO: mongoose schema for cat
import {Schema, model} from 'mongoose';
import {Cat} from '../../interfaces/Cat';

const catSchema = new Schema<Cat>({
  _id: {type: String, required: true, unique: true},
  cat_name: {type: String, required: true},
  weight: {type: Number, required: true},
  filename: {type: String, required: true, unique: true},
  birthdate: {type: Date, required: true, max: Date.now()},
  location: {
    type: {type: String, enum: ['Point'], required: true},
    coordinates: {type: [Number], required: true},
  },
  owner: {
    _id: {type: String, required: true},
    user_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
  },
});

export default model<Cat>('Cat', catSchema);
