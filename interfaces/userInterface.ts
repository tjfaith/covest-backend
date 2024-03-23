import { Status } from '@prisma/client';

export interface CreateUserInput extends UserInstance {
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface GoogleLoginDetails{
  idToken:string
}

export interface UserInstance {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  token?:string;
  avatar?:string;
  gender?: string;
  status?:Status ;
  marital_status?: string;
  date_of_birth?: string;
  address?: string;
  city?: string;
  state?:string;
  country?: string;
  nok_full_name?:string;
  nok_email?:string;
  nok_phone_number?:string;
  nok_relationship?:string;
  nok_address?:string;
}

export interface GoogleSignupInstance{
  email:string,
  first_name?: string,
  last_name?:string,
  avatar?:string,
  status: Status,
  password: string,
}

export interface CustomResponse {
  status: number;
  error: {
    message: string;
  };
}