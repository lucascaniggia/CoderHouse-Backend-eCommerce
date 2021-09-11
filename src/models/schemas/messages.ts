import mongoose from 'mongoose';

const messagesCollection = 'mensajes';

const MessageSchema = new mongoose.Schema({
  email: { type: String, require: true, max: 100 },
  text: { type: String, require: true },
});

export const messages = mongoose.model(messagesCollection, MessageSchema);