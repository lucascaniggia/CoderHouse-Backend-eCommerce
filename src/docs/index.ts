import basicInfo from './mainInfo';
import components from './components';
import products from './products';
import servers from './server';
import tags from './tags';
import cart from './cart';

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...products,
    ...cart,
  },
};
