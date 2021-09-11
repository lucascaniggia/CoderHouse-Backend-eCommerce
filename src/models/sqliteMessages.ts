import { sqLiteDbService } from '/services/sqlite';
import { IntMessage } from '/common/interfaces';

class MessagesModel {
  async get(): Promise<IntMessage[]> {
    try {
      return sqLiteDbService.get('messages');
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading messages.' };
    }
  }

  async save(message: IntMessage): Promise<IntMessage> {
    try {
      const newMessage = await sqLiteDbService.create('messages', message);
      return newMessage[0];
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