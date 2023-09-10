// TODO: cat interface
import {Document} from 'mongoose';
import {UserOutput} from './User';
import {Point} from 'geojson';

interface Cat extends Document {
  _id: string;
  cat_name: string;
  weight: number;
  filename: string;
  birthdate: Date;
  location: {
    type: Point;
    coordinates: [number, number];
  };
  owner: UserOutput;
}

export {Cat};
