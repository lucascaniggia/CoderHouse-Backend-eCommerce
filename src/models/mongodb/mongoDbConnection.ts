import mongoose from 'mongoose';
import Config from 'config';
import { ModelType } from 'common/enums';
import { modelTypeToUse } from 'api/modelType';

const getMongoDbUrl = (type: number): string => {
  let mongoURL = '';
  switch (type) {
    case ModelType.localMongo:
      mongoURL = 'mongodb://0.0.0.0:27017/ecommerce';
      break;
    default:
      mongoURL = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
      break;
  }
  return mongoURL;
};

const mongoURL = getMongoDbUrl(modelTypeToUse);

export const clientPromise = mongoose.connect(mongoURL).then(m => {
  console.log('Mongo DB connected successfully.');
  return m.connection.getClient();
});
