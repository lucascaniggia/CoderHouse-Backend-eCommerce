import { IntMessage } from 'common/interfaces/messages';
import mongoose from 'mongoose';
import { BaseRepository } from './repository/baseMessages';

const messagesCollection = 'messages';

const MessageSchema = new mongoose.Schema<IntMessage>(
  {
    email: { type: String, require: true },
    text: { type: String, require: true },
  },
  {
    timestamps: {
      createdAt: 'date',
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

// class MessagesModelMongoDb {
//   private messages;
//   constructor() {
//     this.messages = messagesModel;
//   }
//   async get(id?: string): Promise<IntMessage[]> {
//     if (id) return this.messages.find({ _id: id });
//     return this.messages.find({});
//   }

//   async save(data: IntMessage): Promise<IntMessage> {
//     const saveModel = new this.messages(data);
//     return saveModel.save();
//   }
// }
export class MessagesModelMongoDB extends BaseRepository<IntMessage> {}

export const messagesModelMongoDb = new MessagesModelMongoDB(
  messagesCollection,
  MessageSchema,
);
