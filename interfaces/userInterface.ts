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
  phone_number?: String;
  token?:string;
  avatar?:string;
  gender?: string;
  status?:string | undefined;
  marital_status?: string;
  date_of_birth?: number;
  address?: string;
}
