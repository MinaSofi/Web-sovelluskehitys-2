// TODO: cat interface
import {Document} from 'mongoose';
import {Point} from 'geojson';

interface Cat extends Document {
  cat_name: string;
  weight: number;
  filename: string;
  birthdate: Date;
  location?: {
    type: Point;
    coordinates: number[];
  };
  owner: {
    _id: string;
    user_name: string;
    email: string;
  };
}

export {Cat};
