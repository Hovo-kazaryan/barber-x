import { USER_ROLES } from 'src/shared/constants';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class UserSQL {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  surname: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  avatar?: string;

  @Column({ type: 'float', nullable: true })
  rating?: number;

  @Column({
    type: 'enum',
    enum: USER_ROLES,
    default: USER_ROLES.CLIENT,
  })
  role: USER_ROLES;

  @Column({
    type: 'json',
    nullable: true,
  })
  bankCard?: {
    number: string;
    expiry: string;
    cvv?: string;
  };
}
