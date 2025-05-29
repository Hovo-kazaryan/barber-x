import { USER_ROLES } from 'src/shared/constants';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  TableInheritance,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleSQL } from '../../roles/schemas/roles.orm';

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

  @ManyToOne(() => RoleSQL, { eager: true })
  @JoinColumn({ name: 'role' })
  role: RoleSQL;

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
