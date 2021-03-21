export interface UserDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  dealerId?: number;
  dealer?: string;
  isAdmin?: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
}
