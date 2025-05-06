import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserMongo } from './user.schema';

@Schema()
export class AdminMongo extends UserMongo {}

export const AdminSchema = SchemaFactory.createForClass(AdminMongo);

export type AdminDocument = AdminMongo & Document;
