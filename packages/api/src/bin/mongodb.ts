import env from '@/utils/env';
import mongoose from 'mongoose';

function onError(err: Error) {
  console.log(err);
}

function onClose() {
  console.log('MongoDB disconnected');
}

function onConnected() {
  console.log('MongoDB connected');
}

mongoose.connection.on('error', onError);
mongoose.connection.on('close', onClose);
mongoose.connection.on('connected', onConnected);

export default mongoose.connect(env.MONGO_URI);
