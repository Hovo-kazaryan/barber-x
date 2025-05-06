import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { Types } from 'mongoose';
import { AdminMongo } from '../schemas/admin.schema';
import { MasterMongo } from '../schemas/master.schema';
import { ClientMongo } from '../schemas/client.schema';

type MongoUserLike = (ClientMongo | AdminMongo | MasterMongo) & {
  _id?: Types.ObjectId | string;
};

export function mapMongoToAbstractUser(user: MongoUserLike): AbstractUser {
  return {
    _id: user?._id?.toString?.(),
    name: user.name,
    surname: user.surname,
    phone: user.phone,
    email: user.email,
    avatar: user.avatar,
    rating: user.rating,
    bankCard: user.bankCard,
    role: user.role,
  };
}
