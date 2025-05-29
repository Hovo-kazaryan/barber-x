import { USER_ROLES } from 'src/shared/constants';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class RoleSQL {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({
    type: 'enum',
    enum: USER_ROLES,
    unique: true,
  })
  name: USER_ROLES;
}
