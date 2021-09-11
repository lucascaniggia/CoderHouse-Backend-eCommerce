export interface IntObject {
  [key: string]: string | number | boolean | unknown;
}

export interface IntItem extends IntObject {
  id: string;
  name: string;
  description: string;
  code: string;
  price: number;
  photo: string;
  timestamp: string;
  stock: number;
}

export interface IntMessage {
  email: string
  text: string
}