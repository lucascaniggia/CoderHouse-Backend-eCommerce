import { mongoMessagesDBServ } from '/services/mongodb';
import { IntMessage, DocumentIntMessage } from '../common/interfaces';

class MessagesModel {
  async get(): Promise<DocumentIntMessage[]> {
    try {
      return mongoMessagesDBServ.get();
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading messages' };
    }
  }

  async save(message: IntMessage): Promise<DocumentIntMessage> {
    try {
      const newMessage = await mongoMessagesDBServ.create(message);
      return newMessage;
    } catch (e) {
      if (e.code) {
        throw { error: e, message: 'Message could not be saved.' };
      } else {
        throw Error(e.message);
      }
    }
  }
}

export const messagesModel = new MessagesModel();