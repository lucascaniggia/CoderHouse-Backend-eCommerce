import { IntMessage } from 'common/interfaces';
import { mongoModelMessages } from 'models/mongodb/message';

class MessagesAPI {
  get(id?: string): Promise<IntMessage | IntMessage[]> {
    if (id) return mongoModelMessages.get(id);
    return mongoModelMessages.get();
  }

  async save(data: IntMessage) {
    const newMessage = await mongoModelMessages.save(data);
    return newMessage;
  }
}

export const messagesAPI = new MessagesAPI();
