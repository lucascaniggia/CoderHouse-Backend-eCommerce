import 'dotenv/config.js';

const env = {
  PORT: process.env.PORT || 8080,
  MODE: process.env.MODE || 'noCluster',

  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pass',
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterURL',
  MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbName',
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'localDbName',

  FIREBASE_PRIVATEKEY: process.env.FIREBASE_PRIVATE_KEY || 'firebasePrivKey',
  FIREBASE_CLIENT_EMAIL:
    process.env.FIREBASE_CLIENT_EMAIL || 'firebaseClientEmail',
  FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID || 'firebaseProjectID',
};

export default env;
