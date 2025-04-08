export type ServiceResponseType = {
  items: ServicesType[];
};
export type ServicesType = {
  label: string;
  url: string;
  icon?: string;
  text: string;
  image: string;
  additionClass: string;
  children: ServicesType[];
};
