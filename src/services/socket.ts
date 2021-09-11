import * as socketIO from 'socket.io';
import * as http from 'http';
import { messagesModel } from '/models/sqliteMessages';

export const wsServerInit = (server: http.Server): void => {
  const io: socketIO.Server = new socketIO.Server();
  io.attach(server);

  io.on('connection', async (socket: socketIO.Socket) => {
    console.log('New connection');

    try {
      const messages = await messagesModel.get();
      socket.emit('messages', messages);
    } catch (e) {
      socket.emit('messages error', {
        error: e.error,
        message: e.message,
      });
    }

    socket.on('new message', async (newMessage) => {
      messagesModel
        .save(newMessage)
        .then(() => {
          socket.emit('save message success', null);
          messagesModel
            .get()
            .then((messages) => {
              io.emit('messages', messages);
            })
            .catch((e) => {
              socket.emit('messages error', {
                error: e.error,
                message: e.message,
              });
            });
        })
        .catch((e) => {
          socket.emit('save message error', {
            error: e.error,
            message: e.message,
          });
        });
    });
  });
};