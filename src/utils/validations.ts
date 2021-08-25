import { isUrl, isValidCode } from './regEx';
import { IntItem } from '../common/interfaces';
import { getEmptyFields } from './objects';

// @parameter -> product item
// Check if product contains any invalid getEmptyFields. If having,
// returns proper error

export const isValidProduct = (product: IntItem): boolean | Error => {
  const emptyFields = getEmptyFields(product);

  if (emptyFields.length !== 0) {
    throw {
      message: 'All fields are required, except from "Stock"',
      error: `Missing fields: ${emptyFields.join(', ')}`
    };
  }

  if (product.price === 0 || isNaN(product.price)) {
    throw new Error(
      'Please check data, price must be a non-zero number.'
    );
  }

  if (!isUrl(product.photo)) {
    throw new Error(
      'VPlease check data, photo URL must be valid.'
    );
  }

  if (!isValidCode(product.code)) {
    throw new Error(
      'Please check data, invalid code.'
    );
  }

  if (isNaN(product.stock)) {
    throw new Error(
      'Please check data, stock must be a number.'
    );
  }

  return true;
};