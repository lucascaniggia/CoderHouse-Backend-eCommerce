import { EnumErrorCodes } from 'common/enums';

export class ProductValidation extends Error {
  public error: string;
  constructor(message: string) {
    super();
    this.message = message;
    this.error = `-${EnumErrorCodes.ProductValidation}`;
  }
}

export class MissingFieldsProduct extends ProductValidation {
  public description: string;
  constructor(message: string, description?: string) {
    super(message);
    this.description = description || '';
  }
}

export class NotFound extends Error {
  public error: string;
  constructor(message: string) {
    super();
    this.message = message;
    this.error = `-${EnumErrorCodes.ProductNotFound}`;
  }
}