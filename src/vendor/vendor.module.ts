import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { VendorRepository } from './vendor.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor, VendorSchema } from '@modules/vendor/schemas/vendor.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vendor.name, schema: VendorSchema }
    ])
  ],
  providers: [VendorService, VendorRepository],
  controllers: [VendorController]
})
export class VendorModule {}
