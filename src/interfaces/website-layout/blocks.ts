export type BLOCK_TYPE = {
  type: string;
  photo: string;
  name: string;
};
export type BLOCK_STYLE = {
  id: number;
  photo: string;
  selected: boolean;
  type: string;
};

export const blocks: BLOCK_TYPE[] = [
  {
    type: 'header',
    name: 'Header',
    photo: '/images/header.jpg',
  },
  {
    type: 'product-list',
    name: 'Product List',
    photo: '/images/header.jpg',
  },
  {
    type: 'footer',
    name: 'Footer',
    photo: '/images/header.jpg',
  },
];
export const headerStyles: BLOCK_STYLE[] = [
  {
    id: 1,
    photo: '/images/header.jpg',
    selected: true,
    type: 'header',
  },
  {
    id: 2,
    photo: '/images/header2.jpg',
    selected: false,
    type: 'footer',
  },
];
