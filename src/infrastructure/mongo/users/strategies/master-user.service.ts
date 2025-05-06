import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RpcException } from '@nestjs/microservices';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Planner } from '../schemas/planner.schema';
import { ERROR_MESSAGES } from 'src/shared/messages';
import { MasterMongo } from '../schemas/master.schema';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { mapMongoToAbstractUser } from './mongo-user.mapper';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

@Injectable()
export class MasterUserStrategy implements IUserRepository {
  constructor(
    @InjectModel(MasterMongo.name)
    private masterModel: Model<MasterMongo>,
    @InjectModel(Planner.name)
    private plannerModel: Model<Planner>,
  ) {}

  async create(payload: any): Promise<AbstractUser> {
    const checkIsExists = await this.masterModel.findOne({
      email: payload.email,
    });

    if (checkIsExists) {
      throw new RpcException({
        email: ERROR_MESSAGES.EMAIL_IN_USE,
      });
    }
    const master = await this.masterModel.create(payload);
    const planner = await this.plannerModel.create({ masterId: master._id });
    master.plannerId = planner._id;
    await master.save();

    return mapMongoToAbstractUser(master);
  }

  async getByEmail(email: string): Promise<AbstractUser> {
    const master = await this.masterModel.findOne({ email });

    if (!master) {
      throw new NotFoundException('Master is not found');
    }

    return mapMongoToAbstractUser(master);
  }

  async getById(id: string): Promise<AbstractUser> {
    const master = await this.masterModel.findById(id);

    if (!master) {
      throw new NotFoundException('Master is not found');
    }

    return mapMongoToAbstractUser(master);
  }

  delete(id: string): Promise<boolean> {
    return null;
  }
}
