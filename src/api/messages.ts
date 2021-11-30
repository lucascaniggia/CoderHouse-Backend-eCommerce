import { IntMessage } from 'common/interfaces/messages';
import { messagesModelMongoDb } from 'models/mongodb/messages';

class MessagesAPI {
  get(id?: string): Promise<IntMessage | IntMessage[]> {
    if (id) return messagesModelMongoDb.get(id);
    return messagesModelMongoDb.get();
  }

  async save(data: IntMessage) {
    const newMessage = await messagesModelMongoDb.save(data);
    return newMessage;
  }
}

export const messagesAPI = new MessagesAPI();
