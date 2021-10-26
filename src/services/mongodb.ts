import mongoose from 'mongoose';
import Config from 'config';
import { ModelType } from 'common/enums';
import { modelTypeToUse } from 'api/modelType';
import { logger } from 'utils/logger';

const getMongoDbUrl = (type: number): string => {
  switch (type) {
    case ModelType.localMongo:
      return 'mongodb://0.0.0.0:27017/ecommerce';
    default:
      return `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
  }
};

const mongoURL = getMongoDbUrl(modelTypeToUse);

export const clientPromise = mongoose.connect(mongoURL).then(m => {
  logger.info('Mongo DB connected successfully.');
  return m.connection.getClient();
});
