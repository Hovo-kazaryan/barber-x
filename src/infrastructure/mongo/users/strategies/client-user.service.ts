import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserMongo } from '../schemas/user.schema';
import { ERROR_MESSAGES } from 'src/shared/messages';
import { Client } from 'src/core/users/entities/client.entity';
import { UserCreationStrategy } from './user-creation.strategy';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { mapMongoToAbstractUser } from './mongo-user.mapper';

@Injectable()
export class ClientUserStrategy implements UserCreationStrategy {
  constructor(
    @InjectModel(UserMongo.name) private userModel: Model<UserMongo>,
  ) {}

  async create(payload: Client): Promise<any> {
    const checkIsExists = await this.userModel.findOne({
      email: payload.email,
    });

    if (checkIsExists) {
      throw new UnprocessableEntityException({
        email: ERROR_MESSAGES.EMAIL_IN_USE,
      });
    }

    return this.userModel.create(payload);
  }

  async getById(id: string): Promise<AbstractUser> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return mapMongoToAbstractUser(user);
  }

  async getByEmail(email: string): Promise<AbstractUser> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return mapMongoToAbstractUser(user);
  }
}
