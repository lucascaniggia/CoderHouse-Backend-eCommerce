export enum EnumErrorCodes {
  UnauthRoute = 1,
  UnknownEndpoint,
  ProductValidation,
  ProductNotFound,
}

export enum ModelType {
  memory,
  faker,
  fs,
  mySql,
  sqlite,
  localMongo,
  mongoAtlas,
  firebase,
}
