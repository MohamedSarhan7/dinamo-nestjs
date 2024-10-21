import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VendorDocument = Vendor & Document;
@Schema()
export class Vendor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [Types.ObjectId], ref: 'Product' })
  products: Types.ObjectId[];  // A list of products sold by this vendor
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
