import { NguoiDung, PrismaClient } from '@prisma/client';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { userLogin } from './Dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  prisma = new PrismaClient();

  async login(userLogin: userLogin, res) {
    let token = this.jwtService.sign(
      { data: 'node29' },
      { secret: this.config.get('SECRET_KEY'), expiresIn: '5y' },
    );

    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: { tai_khoan: userLogin.taiKhoan },
    });

    if (checkUser) {
      if (checkUser.mat_khau == userLogin.mat_khau) {
        res.status(200).json({
          status: HttpStatus.CREATED,
          message: 'Đăng nhập thành công',
          content: token,
        });
      } else {
        throw new HttpException(
          'password not found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        'account not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
