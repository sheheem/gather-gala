import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { VendorStatus } from './vendor.enum';

export type VendorDocument = HydratedDocument<Vendor>;

@Schema()
export class Vendor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  password: string;

  @Prop()
  addresses: string[];

  @Prop()
  image: string;

  @Prop()
  status: VendorStatus;
}

export const vendorSchema = SchemaFactory.createForClass(Vendor);
