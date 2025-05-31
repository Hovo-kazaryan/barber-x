import { IsString } from 'class-validator';
import { USER_ROLES } from 'src/shared/constants';

export class CreateRoleDTO {
  @IsString()
  role: USER_ROLES;
}
