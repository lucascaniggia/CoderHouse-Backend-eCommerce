import * as socketio from 'socket.io';
import * as http from 'http';
import { messagesAPI } from 'api/messages';
import { IntMessage } from 'common/interfaces';
import { normalize, schema } from 'normalizr';
import util from 'util';

export const initWsServer = (server: http.Server): void => {
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  io.on('connection', async (socket: socketio.Socket) => {
    console.log('New WebSocket connection!');

    try {
      const messages = ((await messagesAPI.get()) as IntMessage[]).map(msg => ({
        id: msg._id,
        author: msg.author,
        text: msg.text,
        timestamp: msg.timestamp,
      }));

      const authorSchema = new schema.Entity('authors');
      const messageSchema = new schema.Entity('message', {
        author: authorSchema,
      });
      const messagesSchema = new schema.Array(messageSchema);
      const normalizedData = normalize(messages, messagesSchema);

      socket.emit('messages', normalizedData);
    } catch (e) {
      socket.emit('messages error', {
        error: e.error,
        message: e.message,
      });
    }

    socket.on('new message', async newMessage => {
      messagesAPI
        .save(newMessage)
        .then(() => {
          socket.emit('save message success', null);
          messagesAPI
            .get()
            .then(message => {
              const messages = (message as IntMessage[]).map(msg => ({
                id: msg._id,
                author: msg.author,
                text: msg.text,
                timestamp: msg.timestamp,
              }));

              const authorSchema = new schema.Entity('authors');
              const messageSchema = new schema.Entity('message', {
                author: authorSchema,
              });
              const messagesSchema = new schema.Array(messageSchema);
              const normalizedData = normalize(messages, messagesSchema);
              io.emit('messages', normalizedData);
            })
            .catch(e => {
              socket.emit('messages error', {
                error: e.error,
                message: e.message,
              });
            });
        })
        .catch(e => {
          socket.emit('save message error', {
            error: e.error,
            message: e.message,
          });
        });
    });
  });
};
