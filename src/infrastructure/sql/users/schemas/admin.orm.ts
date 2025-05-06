import { ChildEntity, Column } from 'typeorm';
import { UserSQL } from './user.orm.entity';

@ChildEntity()
export class AdminSQL extends UserSQL {}
