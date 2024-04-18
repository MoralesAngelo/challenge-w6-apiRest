export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
};

//los datos que se le pediran al usuario
export type UserCreateDto = {
  name: string;
  email: string;
  password: string;
};

export type UserUpdateDto = Partial<UserCreateDto>;

// export type UserUpdateDto = {
//   name?: string;
//   email?: string;
// };
