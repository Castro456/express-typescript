import { IsAlpha, IsAlphanumeric, IsEmail, IsPhoneNumber, IsString, IsStrongPassword, MaxLength, MinLength} from 'class-validator';

export class UsersDto {
  userId: number;
  userFname: string;
  userLname: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userLastLogin: Date | null;
}


export class UserRegister {
  @IsAlpha()
  firstName: string;

  @IsAlpha()
  lastName: string;

  @IsString()
  @MaxLength(8)
  @MinLength(5)
  userName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber("IN")
  phone: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  password: string;
}