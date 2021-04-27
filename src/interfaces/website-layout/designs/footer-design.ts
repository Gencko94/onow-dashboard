type FOOTER_ORDER_COMPONENTS =
  | 'logo'
  | 'contact-form'
  | 'nav-links'
  | 'office-location';
type FOOTER_ORDER = FOOTER_ORDER_COMPONENTS[];
type FOOTER_STYLES = {
  backgroundColor: string;
  textColor: string;
};

export interface FOOTER_DESIGN {
  id: number;
  isSelected: boolean;
  order: FOOTER_ORDER;
  styles: FOOTER_STYLES;
  navLinksOptions: {};
  officeLocationOptions: {};
}
