import {
  Controller,
  Body,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UserDto } from 'src/users/dto/users.dto';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  signUp(@Body() userDto: UserDto) {
    return this.authService.signUp(userDto);
  }

  @Post('signIn')
  signIn(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(authDto, response);
  }
  @UseGuards(AuthGuard)
  @Get('user')
  getUser(@Req() request: Request) {
    return this.authService.getUser(request);
  }
  @UseGuards(AuthGuard)
  @Post('logOut')
  logOut(@Res({ passthrough: true }) response: Response) {
    return this.authService.logOut(response);
  }
}
