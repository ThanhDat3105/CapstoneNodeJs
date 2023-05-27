import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NguoiDung } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';
import { userLogin } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: userLogin })
  @Post('/login')
  login(@Body() body: userLogin, @Res() res) {
    return this.authService.login(body, res);
  }
}
