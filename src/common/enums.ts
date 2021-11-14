export enum EnumErrorCodes {
  UnauthRoute = 1,
  UnknownEndpoint,
  ProductValidation,
  ProductNotFound,
  UserSignUpValidation,
  UserAlreadyExists,
  UserDoesNotExist,
  UserNotLoggedIn,
  CartEmpty,
}

export enum ModelType {
  memory,
  fs,
  mySql,
  sqlite,
  localMongo,
  mongoAtlas,
  firebase,
}
