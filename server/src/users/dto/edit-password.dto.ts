import { IsNotEmpty, MinLength } from 'class-validator';

export class EditPasswordDto {
  @IsNotEmpty()
  @MinLength(10)
  password: string;

  @IsNotEmpty()
  @MinLength(10)
  oldpassword: string;
}
