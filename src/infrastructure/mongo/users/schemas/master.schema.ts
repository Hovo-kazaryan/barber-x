import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserMongo } from './user.schema';
import { Types } from 'mongoose';
import { Planner } from './planner.schema';

@Schema()
export class MasterMongo extends UserMongo {
  @Prop({
    type: Types.ObjectId,
    ref: 'Planner',
    required: false,
    default: null,
  })
  plannerId?: Types.ObjectId;
}

export const MasterSchema = SchemaFactory.createForClass(MasterMongo);
export type MasterDocument = MasterMongo & Document;
