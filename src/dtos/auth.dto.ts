import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  name: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResponse {
  id: number;
  email: string;
  nickname: string;
}
