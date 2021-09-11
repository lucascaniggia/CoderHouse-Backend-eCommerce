import mongoose from 'mongoose';

class MongoDB {
  private DbUrl: string;
  constructor() {
    this.DbUrl = 'mongodb://0.0.0.0:27017/ecommerce';
  }

  async init() {
    try {
      await mongoose.connect(this.DbUrl);
      console.log('Mongo DB connected successfully');
    } catch (e) {
      console.log(e);
    }
  }
}

export const mongoDBServ = new MongoDB();