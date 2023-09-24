// TODO: mongoose schema for cat
import {Schema, model} from 'mongoose';
import {Cat} from '../../interfaces/Cat';

const catSchema = new Schema<Cat>({
  cat_name: {type: String, required: true, minlength: 2},
  weight: {type: Number, required: true},
  filename: {type: String, required: true, unique: true},
  birthdate: {type: Date, required: true, max: Date.now()},
  location: {
    type: {type: String, enum: ['Point']},
    coordinates: {type: [Number]},
  },
  owner: {
    _id: {type: String},
    user_name: {type: String},
    email: {type: String},
  },
});

export default model<Cat>('Cat', catSchema);
