import { Types } from 'mongoose';

export interface IntMessage {
  id?: string;
  user: Types.ObjectId;
  text: string;
  type: 'user' | 'system';
  date?: string;
}
