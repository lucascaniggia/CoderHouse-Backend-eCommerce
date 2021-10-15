import args from 'args';

const options = [
  {
    name: 'port',
    description: 'Port on which the app is running',
  },
  {
    name: 'faceId',
    description: 'Facebook App ID',
  },
  {
    name: 'faceSecret',
    description: 'Facebook App secret',
  },
];

args.options(options);

const flags = args.parse(process.argv);

const env = {
  PORT: flags.port || process.env.PORT || 8080,

  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pass',
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterURL',
  MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbName',
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'localDbName',

  FIREBASE_PRIVATEKEY: process.env.FIREBASE_PRIVATE_KEY || 'firebasePrivKey',
  FIREBASE_CLIENT_EMAIL:
    process.env.FIREBASE_CLIENT_EMAIL || 'firebaseClientEmail',
  FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID || 'firebaseProjectID',

  FACEBOOK_APP_ID: flags.faceId || process.env.FACEBOOK_APP_ID || 'faceId',
  FACEBOOK_APP_SECRET:
    flags.faceSecret || process.env.FACEBOOK_APP_SECRET || 'faceSecret',
};

export default env;
