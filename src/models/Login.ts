import {SimpleUserDto} from './User';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  simpleUserDto: SimpleUserDto;
  token: string;
}



