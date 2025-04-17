import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreationStrategy } from './user-creation.strategy';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AdminMongo } from '../schemas/admin.schema';
import { Admin } from 'src/core/users/entities/admin.entity';
import { ERROR_MESSAGES } from 'src/shared/messages';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { mapMongoToAbstractUser } from './mongo-user.mapper';

@Injectable()
export class AdminUserCreator implements UserCreationStrategy {
  constructor(
    @InjectModel(AdminMongo.name) private adminModel: Model<AdminMongo>,
  ) {}

  async create(payload: Admin): Promise<any> {
    const checkIsExists = await this.adminModel.findOne({
      email: payload.email,
    });

    if (checkIsExists) {
      throw new UnprocessableEntityException({
        email: ERROR_MESSAGES.ERROR_EMAIL_IN_USE,
      });
    }

    return this.adminModel.create(payload);
  }

  async getByEmail(email: string): Promise<AbstractUser> {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) {
      throw new NotFoundException('Wrong email provided');
    }

    return mapMongoToAbstractUser(admin);
  }

  async getById(id: string): Promise<AbstractUser> {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException('User is not found');
    }

    return mapMongoToAbstractUser(admin);
  }
}
