import { NullLiteral } from "typescript";

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
  parent: CATEGORY | null;
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
export interface NEW_CATEGORY {
  id: number;
  name: {
    [key: string]: string;
  };
  slug: string;
  parent: CATEGORY | null;
  image: string;
  active: boolean;
  seo_description: string;
  as_child: boolean;
}
