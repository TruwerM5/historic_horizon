import { IsEmail, IsNotEmpty } from 'class-validator';

export class EditProfileDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;
}
