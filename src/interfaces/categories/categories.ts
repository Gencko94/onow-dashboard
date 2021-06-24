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
  children?: {
    id: number;
    name: {
      [key: string]: string;
    };
  }[];
  seo_description: string;
  active: boolean;
  as_child: boolean;
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
  id: number;
  name: {
    [key: string]: string;
  };
  slug: string;
  parent_id: number;
  image: File;
  active: 0 | 1;
  seo_description: string;
};
