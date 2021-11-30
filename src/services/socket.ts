import * as socketio from 'socket.io';
import * as http from 'http';
import { messagesAPI } from 'api/messages';

export const initWsServer = (server: http.Server): void => {
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  io.on('connection', async (socket: socketio.Socket) => {
    console.log('New connection');

    try {
      const messages = await messagesAPI.get();

      socket.emit('messages', messages);
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
            .then(messages => {
              io.emit('messages', messages);
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
