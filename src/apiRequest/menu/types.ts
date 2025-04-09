export type MenuResponseType = {
  items: MenuItemType[];
};
export type MenuItemType = {
  label: string;
  url: string;
  icon?: string;
  text: string;
  image: string;
  additionClass: string;
  children: MenuItemType[];
};
