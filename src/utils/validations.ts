import { isUrl, isValidCode } from '/utils/regEx';
import { IntItem } from '/common/interfaces';
import { getEmptyFields } from '/utils/objects';
import { MissingFieldsProduct, ProductValidation } from '/errors';

// @parameter -> product item
// Check if product contains any invalid getEmptyFields. If having,
// returns proper error

export const isValidProduct = (product: IntItem): boolean | Error => {
  const emptyFields = getEmptyFields(product);

  if (emptyFields.length !== 0) {
    throw new MissingFieldsProduct(
      'All fields are required, except from "Stock"',
      `Missing fields: ${emptyFields.join(', ')}`
    );
  }

  if (product.price === 0 || isNaN(product.price)) {
    throw new ProductValidation(
      'Please check data, price must be a non-zero number.'
    );
  }

  if (!isUrl(product.photo)) {
    throw new ProductValidation(
      'Please check data, photo URL must be valid.'
    );
  }

  if (!isValidCode(product.code)) {
    throw new ProductValidation(
      'Please check data, code must be valid.'
    );
  }

  if (isNaN(product.stock)) {
    throw new ProductValidation('Please check data, stock must be a number.',
    );
  }

  return true;
};
