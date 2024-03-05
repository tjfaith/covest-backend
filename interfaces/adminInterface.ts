export interface CreateBootAdmin{
    email: string;
    password: string;
}

export type RoleType =  'boot_admin'|'admin'|'retailer'|'user' 

export interface CreateUser{
    email:string;
    role: RoleType
}