import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Repository } from 'nestjs-mongoose-generic-repository';
import { VendorLogDto } from 'src/dto/vendorDTO/vendorLogin.dto';
import { VendorSignDto } from 'src/dto/vendorDTO/vendorSign.dto';
import { Vendor, VendorDocument } from './vendor.schema';

@Injectable()
export class VendorRepository extends Repository<VendorDocument> {
  constructor(@InjectModel(Vendor.name) private entity: Model<VendorDocument>) {
    super(entity);
  }

  async vendorSignUp(vendorSignDto: VendorSignDto): Promise<Vendor> {
    const vendor = await this.entity.findOne({ email: vendorSignDto.email });
    if (vendor) {
      throw new ConflictException('Vendor Already Exists');
    } else {
      const createdVendor = new this.entity(vendorSignDto);
      const salt = await bcrypt.genSalt();
      createdVendor.password = await this.hashedPassword(
        createdVendor.password,
        salt,
      );
      return createdVendor.save();
    }
  }

  async vendorSignIn(vendorLogDto: VendorLogDto) {
    const vendor = await this.entity.findOne({ email: vendorLogDto.email });
    if (vendor) {
      const isMatch = await bcrypt.compare(
        vendorLogDto.password,
        vendor.password,
      );
      if (isMatch) {
        return vendor;
      } else {
        throw new UnauthorizedException('Invalid Credentials');
      }
    } else {
      throw new ConflictException('Invalid Credentials');
    }
  }

  async vfindOne(email: string) {
    const vendorId = await this.entity.findOne({ email: email });
    console.log(vendorId);

    if (vendorId) {
      return vendorId;
    } else {
      throw new ConflictException('No Such User Found');
    }
  }

  private async hashedPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
