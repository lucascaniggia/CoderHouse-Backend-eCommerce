import { IntMessage } from 'common/interfaces';
import { messagesModelMongoDB } from 'models/mongodb/message';

class MessagesAPI {
  get(id?: string): Promise<IntMessage | IntMessage[]> {
    if (id) return messagesModelMongoDB.get(id);
    return messagesModelMongoDB.get();
  }

  async save(data: IntMessage) {
    const newMessage = await messagesModelMongoDB.save(data);
    return newMessage;
  }
}

export const messagesAPI = new MessagesAPI();
