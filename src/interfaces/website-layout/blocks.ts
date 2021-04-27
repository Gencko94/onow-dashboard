export type BLOCK_TYPE = {
  type: string;
  photo: string;
  name: string;
};

export const blocks: BLOCK_TYPE[] = [
  {
    type: 'banner',
    name: 'Banner',
    photo: '/images/header.jpg',
  },
  {
    type: 'product-list',
    name: 'Product List',
    photo: '/images/header.jpg',
  },
  {
    type: 'product-grid',
    name: 'Product Grid',
    photo: '/images/header.jpg',
  },
];
