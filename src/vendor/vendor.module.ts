import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { VendorController } from './vendor.controller';
import { VendorRepository } from './vendor.repository';
import { Vendor, vendorSchema } from './vendor.schema';
import { VendorService } from './vendor.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vendor.name, schema: vendorSchema }]),
    forwardRef(() => AuthModule),
  ],
  exports: [VendorRepository],
  controllers: [VendorController],
  providers: [VendorService, VendorRepository],
})
export class VendorModule {}
