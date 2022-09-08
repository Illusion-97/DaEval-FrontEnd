export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  version: number;
  role: string;
}

export const addUser: User = {
  id: 0,
  userName: '',
  email: '',
  password: '',
  version: 0,
  role: ''
};

export interface SimpleUserDto {
  id: number;
  userName: string;
  email: string;
  role: string;
}

export interface GestionUserDto {
  id: number;
  userName: string;
  email: string;
  role: string;
  nbArticles: number;
  version: number;
}



