import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/users.dto';
import { AuthDto } from './dto/auth.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(user: UserDto) {
    let password = user.password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const createdUser = await this.usersService.create({
      ...user,
      password: hash,
    });
    // ! DO NOT RETURN PASSWORD
    delete createdUser.password;
    return createdUser;
  }
  async signIn(authDto: AuthDto, response: Response) {
    const email = authDto.email;
    const password = authDto.password;

    const user = await this.usersService.findUser(email);
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials');
    }
    // Generate JWT
    const payload = { sub: user.id, name: user.name, email: user.email };
    const jwt = await this.jwtService.signAsync(payload);
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'success',
      jwt,
    };
  }

  async getUser(request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      const user = await this.usersService.findUser(data.email);
      // ! DO NOT RETURN PASSWORD
      delete user.password;
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  async logOut(response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }
}
