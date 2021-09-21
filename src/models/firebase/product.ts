import { IntItem } from '/common/interfaces';
import admin, { ServiceAccount } from 'firebase-admin';
import { NotFound } from '/errors';
import { productsMock } from '/mocks/products';
import moment from 'moment';
import serviceAccount from './../../../firebase.json';

export class ProductsModelFirebase {
  public productsDb;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount)
    });
    const db = admin.firestore();
    console.log('Firebase DB set up successfully');
    this.productsDb = db.collection('products');
    this.get()
      .then((products) => {
        if (products.length === 0) {
          const batch = db.batch();
          (productsMock as IntItem[]).map((product) => {
            product.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
            const docRef = this.productsDb.doc();
            batch.set(docRef, product);
          });
          batch.commit().then(() => console.log('Products added successfully.'));
        }
      })
      .catch((e) => console.log(e));
  }

  async get(id?: string): Promise<IntItem[] | IntItem> {
    try {
      let output: IntItem[] | IntItem = [];
      if (id) {
        const data = await this.productsDb.doc(id).get();
        const product = data.data();
        if (product) {
          output = {
            id: data.id,
            ...product
          } as IntItem;
        } else {
          return output[0];
        }
      } else {
      const result = await this.productsDb.get();
      const products = result.docs;
      output = products.map(product => {
        const productData = product.data();
        return {
          id: product.id,
          ...productData
        };
      }) as IntItem[];
    }
    return output;
    } catch (e) {
      throw { error: e, message: 'An error occurred when loading products.' };
    }
  }

  async save(data: IntItem): Promise<IntItem> {
    try {
      data.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
    const productDocumentRef = await this.productsDb.add({
      ...data
    });
    const createdProductId = productDocumentRef.id;
    const createdProduct = await this.get(createdProductId);
    return createdProduct as IntItem;
    } catch (e) {
      throw { error: e, message: 'Product could not be saved.' };
    }
  }

  async update(id: string, product: IntItem): Promise<IntItem> {
    try {
      const productToUpdate = await this.get(id);
      if (productToUpdate) {
        await this.productsDb.doc(id).update(product);
      const updatedProduct = await this.get(id);
      return updatedProduct as IntItem;
      } else {
        throw new NotFound('Product to update does not exist.');
      }
    } catch (e) {
        if (e instanceof NotFound) {
          throw e;
        } else {
          throw { error: e, message: 'Product could not be updated.'};
        }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const productToDelete = await this.get(id);
      if (productToDelete) {
        await this.productsDb.doc(id).delete();
      } else {
        throw new NotFound('Product to delete does not exist.');
      }
    } catch (e) {
      if (e instanceof NotFound) {
        throw e;
      } else {
        throw { error: e, message: 'Product could not be deleted.'};
      }
    }
  }
}