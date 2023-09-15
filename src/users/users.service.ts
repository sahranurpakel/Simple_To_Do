import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}
  async findUser(email: string) {
    return await this.usersModel.findOne({ email });
  }
  async create(user: UserDto) {
    return await this.usersModel.create(user);
  }
}
