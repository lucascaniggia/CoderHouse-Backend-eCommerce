import { isUrl, isValidCode } from 'utils/regEx';
import { IntItem, QueryIntItem, BaseIntUser } from 'common/interfaces';
import { getEmptyFields } from 'utils/objects';
import {
  MissingFieldsProduct,
  MissingFieldsUser,
  ProductValidation,
  UserValidation,
} from 'errors';

// @parameter -> product item
// Check if product contains any invalid getEmptyFields. If having,
// returns proper error

export const isValidProduct = (product: IntItem): boolean | Error => {
  const emptyFields = getEmptyFields(product);

  if (emptyFields.length !== 0) {
    throw new MissingFieldsProduct(
      400,
      'All fields are required, except from "Stock"',
      `Missing fields: ${emptyFields.join(', ')}`,
    );
  }

  if (product.price === 0 || isNaN(product.price)) {
    throw new ProductValidation(
      400,
      'Please check data, price must be a non-zero number.',
    );
  }

  if (!isUrl(product.photo)) {
    throw new ProductValidation(
      400,
      'Please check data, photo URL must be valid.',
    );
  }

  if (!isValidCode(product.code)) {
    throw new ProductValidation(400, 'Please check data, code must be valid.');
  }

  if (isNaN(product.stock)) {
    throw new ProductValidation(
      400,
      'Please check data, stock must be a number.',
    );
  }

  return true;
};

//  @param user user data to sign up
//  @returns checks if the user data has empty fields or if 'edad' is not a number, if so throws a proper error
//

export const isValidUser = (user: BaseIntUser): boolean | Error => {
  const emptyFields = getEmptyFields(user);

  if (emptyFields.length !== 0) {
    throw new MissingFieldsUser(
      400,
      'All fields are required',
      `The following fields are missing: ${emptyFields.join(', ')}`,
    );
  }

  if (isNaN(user.age) || user.edad === 0) {
    throw new UserValidation(
      400,
      'Please check data, age must be a non-zero number.',
    );
  }

  return true;
};

export const isQueryValid = (query: QueryIntItem): boolean | Error => {
  const queryMap = ['minPrice', 'maxPrice', 'minStock', 'maxStock'];

  for (const queryField of queryMap) {
    if (query[queryField] !== undefined && isNaN(Number(query[queryField]))) {
      throw new ProductValidation(
        400,
        'Price/minStock/maxStock must be numbers',
      );
    }
  }

  return true;
};
