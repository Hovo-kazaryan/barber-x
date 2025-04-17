import { Document, Types } from 'mongoose';
import { MasterMongo } from './master.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PlannerDocument = Planner & Document;

@Schema()
export class Planner {
  @Prop({ type: Types.ObjectId, ref: MasterMongo.name, required: true })
  masterId: Types.ObjectId;

  @Prop({ type: [Number], default: [] })
  recurringHolidays: number[];

  @Prop({ type: [Date], default: [] })
  dayOffDates: Date[];

  @Prop({
    type: {
      start: String,
      end: String,
    },
    required: false,
    _id: false,
  })
  lunchBreak?: {
    start: string;
    end: string;
  };

  @Prop({
    type: Map,
    of: {
      start: String,
      end: String,
    },
    default: {},
  })
  weeklySchedule: Map<number, { start: string; end: string }>;
}

export const PlannerSchema = SchemaFactory.createForClass(Planner);
