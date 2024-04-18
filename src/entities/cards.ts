export type Card = {
  id: string;
  name: string;
  brand: string;

  year: string;
};

export type CardDto = {
  name: string;
  brand: string;
  year: string;
};

export type UserUpdateDto = Partial<CardDto>;
