export type QUICK_ADD_CATEGORY = {
  name: string;
  name_ar: string;
  isChild: boolean;
  parent_category: number;
};
export interface CATEGORY {
  id: number;
  name: {
    [key: string]: string;
  };
  parent_id: number;
  image: string;
  slug: string;
  children: CATEGORY[];
  description: {
    [key: string]: string;
  };
  active: boolean;
}
export type MINI_CATEGORY = {
  /**
   *  Id of the Category
   */
  id: number;
  /**
   *  Translated names of the category set by locale keys
   */
  name: {
    [key: string]: string;
  };
  /**
   *  Category image URL
   */
  image: string;
  /**
   *  Category Slug
   */
  slug: string;
  /**
   *  Category children.
   */
  children?: MINI_CATEGORY[];
};
export type NEW_CATEGORY = {
  name: {
    [key: string]: string;
  };
  slug: string;
  parent_id: number;
  image: File;
  active: 0 | 1;
  description: {
    [key: string]: string;
  };
};
export interface EDIT_CATEGORY {
  id: number;
  active: true;
  name: {
    [key: string]: string;
  };
  slug: string;
  parent_id: number;
  description: {
    [key: string]: string;
  };
}
