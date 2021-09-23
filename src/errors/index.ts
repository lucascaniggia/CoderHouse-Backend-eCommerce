import { EnumErrorCodes } from 'common/enums';

export class BaseError extends Error {
  public name;
  public statusCode;
  public message;
  constructor(statusCode: number, message: string) {
    super();
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;

    Error.captureStackTrace(this);
  }
}

export class ProductValidation extends BaseError {
  public error: string;
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
    this.error = `-${EnumErrorCodes.ProductValidation}`;
  }
}

export class MissingFieldsProduct extends ProductValidation {
  public description;
  constructor(statusCode: number, message: string, description?: string) {
    super(statusCode, message);
    this.description = description;
  }
}

export class NotFound extends BaseError {
  public error: string;
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
    this.message = message;
    this.error = `-${EnumErrorCodes.ProductNotFound}`;
  }
}
