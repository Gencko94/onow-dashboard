import {
  categories,
  footerDesign1,
  footerDesigns,
  headerDesign1,
  headerDesign2,
  headerDesigns,
  productGridDesign1,
  productGridDesigns,
} from '../fakeData/fakeData';
// import { CATEGORY } from '../interfaces/categories/categories';
import { FOOTER_DESIGN } from '../interfaces/website-layout/designs/footer-design';
import { HEADER_DESIGN } from '../interfaces/website-layout/designs/header-design';
import { PRODUCT_GRID_DESIGN } from '../interfaces/website-layout/designs/product-grid-design';

export const getBlockDesigns = (type: string): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (type === 'header') {
        resolve(headerDesigns);
      } else if (type === 'footer') {
        resolve(footerDesigns);
      } else if (type === 'product-grid') {
        resolve(productGridDesigns);
      }
    }, 500);
  });
};
export const getHeaderDesign = (id: string): Promise<HEADER_DESIGN> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (id === '1') {
        resolve(headerDesign1);
      } else if (id === '2') {
        resolve(headerDesign2);
      }
    }, 500);
  });
};
export const getFooterDesign = (id: string): Promise<FOOTER_DESIGN> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (id === '1') {
        resolve(footerDesign1);
      }
    }, 500);
  });
};
export const getProductGridDesign = (
  id: string
): Promise<PRODUCT_GRID_DESIGN> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (id === '1') {
        resolve(productGridDesign1);
      }
    }, 500);
  });
};
export const getCategories = (): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(categories);
    }, 500);
  });
};
