import dotenv from 'dotenv';
import args from 'args';

dotenv.config();

const options = [
  {
    name: 'port',
    description: 'The port on which the app runs',
  },
  {
    name: 'faceId',
    description: 'Facebook app ID',
  },
  {
    name: 'faceSecret',
    description: 'Facebook app secret',
  },
  {
    name: 'mode',
    description: 'run in fork or cluster mode',
  },
  {
    name: 'run',
    description: 'forever or pm2',
  },
];

args.options(options);

const flags = args.parse(process.argv);

const env = {
  PORT: process.env.PORT || 8080,
  MODE: process.env.MODE || 'noCluster',

  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pass',
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterURL',
  MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbName',
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'localDbName',

  FACEBOOK_APP_ID: flags.faceId || process.env.FACEBOOK_APP_ID || 'faceId',
  FACEBOOK_APP_SECRET:
    flags.faceSecret || process.env.FACEBOOK_APP_SECRET || 'faceSecret',

  FIREBASE_PRIVATEKEY: process.env.FIREBASE_PRIVATE_KEY || 'firebasePrivKey',
  FIREBASE_CLIENT_EMAIL:
    process.env.FIREBASE_CLIENT_EMAIL || 'firebaseClientEmail',
  FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID || 'firebaseProjectID',

  ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'yourEmailAccount',
  ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD || 'yourEmailPassword',
  ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'yourName',

  GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'email@gmail.com',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
  GMAIL_NAME: process.env.GMAIL_NAME || 'GMail owner name',

  TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID,
  TWILIO_TOKEN: process.env.TWILIO_AUTH_TOKEN || 'TwilioToken',
  TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE || '+123456789',
};

export default env;
