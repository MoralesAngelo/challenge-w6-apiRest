export type User = {
  id: string;
  name: string;
  email: string;
};

//los datos que se le pediran al usuario
export type UserCreateDto = {
  name: string;
  email: string;
};

export type UserUpdateDto = {
  name?: string;
  email?: string;
};
