import { isUrl, isValidCode } from './regEx';
import { IntItem } from 'common/interfaces';
import { getEmptyFields } from './objects';
import { EnumErrorCodes } from 'common/enums';

// @parameter -> product item
// Check if product contains any invalid getEmptyFields. If having,
// returns proper error

export const isValidProduct = (product: IntItem): boolean | Error => {
  const emptyFields = getEmptyFields(product);

  if (emptyFields.length !== 0) {
    throw {
      error: `-${EnumErrorCodes.ProductValidation}`,
      message: 'All fields are required, except from "Stock"',
      description: `Missing fields: ${emptyFields.join(', ')}`,
    };
  }

  if (product.price === 0 || isNaN(product.price)) {
    throw {
      error: `-${EnumErrorCodes.ProductValidation}`,
      message: 'Please check data, price must be a non-zero number.',
    };
  }

  if (!isUrl(product.photo)) {
    throw {
      error: `-${EnumErrorCodes.ProductValidation}`,
      message: 'Please check data, photo URL must be valid.',
    };
  }

  if (!isValidCode(product.code)) {
    throw {
      error: `-${EnumErrorCodes.ProductValidation}`,
      message: 'Please check data, code must be valid.',
    };
  }

  if (isNaN(product.stock)) {
    throw {
      error: `-${EnumErrorCodes.ProductValidation}`,
      message: 'Please check data, stock must be a number.',
    };
  }

  return true;
};
