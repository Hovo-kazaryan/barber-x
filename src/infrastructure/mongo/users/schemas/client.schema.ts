import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserMongo } from './user.schema';

@Schema()
export class ClientMongo extends UserMongo {}

export const ClientSchema = SchemaFactory.createForClass(ClientMongo);

export type ClientDocument = ClientMongo & Document;
