import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { ERROR_MESSAGES } from 'src/shared/messages';
import { ClientMongo } from '../schemas/client.schema';
import { mapMongoToAbstractUser } from './mongo-user.mapper';
import { Client } from 'src/core/users/entities/client.entity';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

@Injectable()
export class ClientUserStrategy implements IUserRepository {
  constructor(
    @InjectModel(ClientMongo.name) private userModel: Model<ClientMongo>,
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

  delete(id: string): Promise<boolean> {
    return null;
  }
}
