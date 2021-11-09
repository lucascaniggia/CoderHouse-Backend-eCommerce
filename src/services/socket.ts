import * as socketio from 'socket.io';
import * as http from 'http';
import { messagesAPI } from 'api/messages';
import { SmsService } from './twilio';
import { logger } from 'utils/logger';

export const initWsServer = (server: http.Server): void => {
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  io.on('connection', async (socket: socketio.Socket) => {
    logger.info('New connection');

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
      if (newMessage.text.toLowerCase().includes('administrator')) {
        SmsService.sendMessage(
          '+56973413854',
          `Message: ${newMessage.text}, Sent by: ${newMessage.email}`,
        );
      }
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
