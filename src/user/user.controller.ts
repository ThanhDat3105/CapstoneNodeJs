import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  Headers,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DatVe, MaLoaiNguoiDung, NguoiDung } from '@prisma/client';
import { NguoiDungDto, user, userLogin } from './dto/user.dto';

@ApiBearerAuth()
@ApiTags('QuanLyNguoiDung')
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(`/LayDanhSachLoaiNguoiDung`)
  getUserType(@Res() res): Promise<MaLoaiNguoiDung[]> | string {
    try {
      return this.userService.getUserType(res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(`/LayDanhSachNguoiDung`)
  getUser(@Res() res): Promise<NguoiDung[]> | string {
    try {
      return this.userService.getUser(res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(`/TimKiemNguoiDung`)
  findUser(@Query(`hoTen`) idQuery: string, @Res() res): Promise<NguoiDung[]> {
    try {
      return this.userService.findUser(idQuery, res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({ type: userLogin })
  @Post(`ThongTinTaiKhoan`)
  profileUser(
    @Body() body: userLogin,
    @Headers('Authorization') auth: string,
    @Res() res,
  ) {
    try {
      return this.userService.profileUser(body, res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({ type: user })
  @Post(`ThemNguoiDung`)
  createUser(@Body() body: NguoiDung, @Res() res): Promise<string> {
    try {
      return this.userService.createUser(body, res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({ type: NguoiDungDto })
  @Put(`CapNhatThongTinNguoiDung`)
  updateUser(
    @Body() body: NguoiDungDto,
    @Headers('Authorization') auth: string,
    @Query(`tai_khoan`) taiKhoan: string,
    @Res() res,
  ): Promise<string> {
    try {
      return this.userService.updateUser(body, taiKhoan, res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(`XoaNguoiDung`)
  removeUser(@Query('taiKhoan') taiKhoan: string, @Res() res) {
    try {
      return this.userService.removeUser(taiKhoan, res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
