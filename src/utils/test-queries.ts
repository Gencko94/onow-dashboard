import { headerStyles, BLOCK_STYLE } from '../interfaces/website-layout/blocks';

export const getBlockStyles = (type: string): Promise<BLOCK_STYLE[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (type === 'header') {
        resolve(headerStyles);
      }
    }, 500);
  });
};
