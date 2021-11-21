import basicInfo from './mainInfo';
import components from './components';
import products from './products';
import servers from './server';
import tags from './tags';

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  ...products,
};
