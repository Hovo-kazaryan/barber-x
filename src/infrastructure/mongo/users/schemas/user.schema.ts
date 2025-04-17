import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { USER_ROLES } from 'src/shared/constants';

@Schema()
export class UserMongo {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  avatar?: string;

  @Prop()
  rating?: number;

  @Prop({ enum: USER_ROLES, required: true })
  role: USER_ROLES;

  @Prop({ type: Object })
  bankCard?: {
    number: string;
    expiry: string;
    cvv?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(UserMongo);

export type UserDocument = UserMongo & Document;
