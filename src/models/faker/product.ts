import { IntItem, QueryIntItem } from 'common/interfaces';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import moment from 'moment';
import { NotFound } from 'errors';

export class ProductsModelFaker {
  private data: IntItem[];
  constructor() {
    this.data = [];
  }

  generateProducts(qty = 10): IntItem[] {
    const newProducts = [];
    for (let i = 0; i < qty; i++) {
      newProducts.push({
        id: uuidv4(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code:
          'PFCH-' +
          faker.fake(
            '{{datatype.number({"min": 1000, "max": 9999})}}-{{datatype.number({"min": 1000, "max": 9999})}}',
          ),
        price: Number(faker.commerce.price()),
        photo: faker.image.imageUrl(),
        timestamp: moment(faker.date.recent()).format('DD/MM/YYYY HH:mm:ss'),
        stock: faker.datatype.number(200),
      });
    }
    return newProducts;
  }

  async get(id?: string): Promise<IntItem | IntItem[]> {
    try {
      if (id)
        return this.data.find((item: IntItem) => item.id == id) as IntItem;
      this.data = this.generateProducts();
      return this.data;
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading products.' };
    }
  }

  async save(product: IntItem): Promise<IntItem> {
    try {
      this.data.push(product);
      return product;
    } catch (e) {
      throw { error: e, message: 'Product could not be saved.' };
    }
  }

  async update(id: string, data: IntItem): Promise<IntItem> {
    try {
      const index = this.data.findIndex(aResource => aResource.id === id);
      if (index) {
        const oldResrc = this.data[index];
        const newResrc = { ...data };

        const updatedResrc = { ...oldResrc, ...newResrc };
        this.data.splice(index, 1, updatedResrc);
        return updatedResrc;
      } else {
        throw new NotFound(404, 'Product to update does not exist.');
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'Product could not be updated.' };
      }
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.data.findIndex(aResource => aResource.id == id);
    if (index) {
      this.data.splice(index, 1);
    } else {
      throw new NotFound(404, 'El product que desea eliminar no existe');
    }
  }

  async query(options: QueryIntItem): Promise<IntItem[]> {
    type Conditions = (aProduct: IntItem) => boolean;
    const query: Conditions[] = [];

    if (options.cant || options.cant === 0) {
      this.data = this.generateProducts(options.cant);
    }

    if (options.name)
      query.push((aProduct: IntItem) => aProduct.name == options.name);

    if (options.code)
      query.push((aProduct: IntItem) => aProduct.code == options.code);

    if (options.minPrice)
      query.push(
        (aProduct: IntItem) => aProduct.price >= (options.minPrice as number),
      );

    if (options.maxPrice)
      query.push(
        (aProduct: IntItem) => aProduct.price <= (options.maxPrice as number),
      );

    if (options.minStock)
      query.push(
        (aProduct: IntItem) => aProduct.stock >= (options.minStock as number),
      );

    if (options.maxStock)
      query.push(
        (aProduct: IntItem) => aProduct.stock <= (options.maxStock as number),
      );

    const filteredProducts = this.data.filter(aProduct =>
      query.every(condition => condition(aProduct)),
    );

    if (filteredProducts.length !== 0) return filteredProducts;
    else throw new NotFound(404, 'No hay products');
  }
}
