export type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  coordinate_x?: number;
  coordinate_y?: number;
};

export type CustomerToAdd = {
  name: string;
  phone: string;
  email: string;
};
