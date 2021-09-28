import Config from 'config';
import { IntMessage } from 'common/interfaces';
import mongoose from 'mongoose';
import moment from 'moment';

const messagesCollection = 'messages';

const MessageSchema = new mongoose.Schema<IntMessage>(
  {
    author: {
      id: { type: String, reqiure: true, max: 100 },
      name: { type: String, require: true, max: 30 },
      lastname: { type: String, require: true, max: 30 },
      age: { type: Number, require: true, max: 99 },
      alias: { type: String, require: true, max: 20 },
      avatar: { type: String, require: true },
    },
    text: { type: String, require: true },
  },
  {
    timestamps: {
      createdAt: 'timestamp',
    },
  },
);

MessageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const messagesModel = mongoose.model<IntMessage>(
  messagesCollection,
  MessageSchema,
);

class MessagesModelMongoDB {
  private dbURL: string;
  private messages;
  constructor(type: 'local' | 'atlas') {
    this.messages = messagesModel;
    if (type === 'local') {
      this.dbURL = 'mongodb://0.0.0.0:27017/ecommerce';
    } else {
      this.dbURL = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
    }
    mongoose
      .connect(this.dbURL)
      .then(() => {
        console.log('Mongo DB - Messages connected!');
      })
      .catch(e => console.log(e));
  }

  async get(id?: string): Promise<IntMessage[]> {
    if (id) return this.messages.find({ _id: id });
    return this.messages.find({});
  }

  async save(data: IntMessage): Promise<IntMessage> {
    const saveModel = new this.messages(data);
    return saveModel.save();
  }
}

export const messagesModelMongoDB = new MessagesModelMongoDB('atlas');
