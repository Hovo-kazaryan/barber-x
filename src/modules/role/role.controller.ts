import { Controller, Inject } from '@nestjs/common';
import { RoleService } from './role.service';
import { Public } from 'src/shared/decorators/public.decorator';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoleDTO } from 'src/core/roles/dto/create-role.dto';

@Controller('role')
export class RoleController {
  constructor(
    @Inject(RoleService)
    private readonly rolesService: RoleService,
  ) {}

  @Public()
  @MessagePattern('get_roles')
  getRoles(@Payload() data: any) {
    return this.rolesService.getRoles();
  }

  @Public()
  @MessagePattern('create_role')
  createRole(@Payload() data: CreateRoleDTO) {
    return this.rolesService.createRole(data);
  }
}
