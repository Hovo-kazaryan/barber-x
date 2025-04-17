// core/users/dto/create-user.dto.ts
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { USER_ROLES } from 'src/shared/constants';

class BankCardDto {
  @IsString()
  number: string;

  @IsString()
  expiry: string;

  @IsOptional()
  @IsString()
  cvv?: string;
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => BankCardDto)
  bankCard?: BankCardDto;

  @IsEnum(USER_ROLES)
  role: USER_ROLES;
}
