export type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  coordinateX?: number;
  coordinateY?: number;
};

export type CustomerToAdd = {
  name: string;
  phone: string;
  email: string;
};
