import { ChildEntity, Column } from 'typeorm';
import { UserSQL } from './user.orm.entity';

@ChildEntity()
export class MasterSQL extends UserSQL {
  @Column({ nullable: true })
  specialty?: string;

  @Column({ nullable: true })
  experienceYears?: number;
}
