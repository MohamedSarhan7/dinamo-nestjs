import { Injectable } from "@nestjs/common";
import { Vendor, VendorDocument } from '@modules/vendor/schemas/vendor.schema';
import { BaseRepository } from '@modules/common/interfaces/BaseRepository';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class VendorRepository extends BaseRepository<VendorDocument> {
  constructor(@InjectModel(Vendor.name) private readonly vendorModel: Model<VendorDocument>) {
    super(vendorModel);
  }
}
