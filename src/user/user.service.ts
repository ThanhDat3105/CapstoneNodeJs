import { Injectable, Body, HttpException, HttpStatus } from '@nestjs/common';
import {
  CumRap,
  DatVe,
  Ghe,
  HeThongRap,
  MaLoaiNguoiDung,
  NguoiDung,
  PrismaClient,
  RapPhim,
} from '@prisma/client';
import { NguoiDungDto, profileUser, userLogin } from './dto/user.dto';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async getUserType(res): Promise<MaLoaiNguoiDung[] | any> {
    let data = await this.prisma.maLoaiNguoiDung.findMany();
    res.json({
      statusCode: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công',
      content: data,
    });
  }

  async getUser(res): Promise<NguoiDung[] | any> {
    let i = 0,
      S = 5;

    while (i <= 10) {
      S += i + 2;
      i += 2;
    }

    console.log(S);
    let data = await this.prisma.nguoiDung.findMany();
    res.json({
      statusCode: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công',
      content: data,
    });
  }

  async findUser(idQuery: string, res): Promise<NguoiDung[] | any> {
    let data = await this.prisma.nguoiDung.findMany({
      where: { ho_ten: { contains: idQuery } },
    });

    res.json({
      statusCode: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công',
      content: data,
    });
  }

  async profileUser(body: userLogin, res) {
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: { tai_khoan: body.taiKhoan },
    });
    let NguoiDung = await this.prisma.nguoiDung.findFirst({
      where: { tai_khoan: body.taiKhoan },
      select: {
        email: true,
        ho_ten: true,
        tai_khoan: true,
        mat_khau: true,
        so_dt: true,
        MaLoaiNguoiDung: { select: { loai_nguoi_dung: true, ten_loai: true } },
        DatVe: {
          select: {
            LichChieu: {
              select: {
                RapPhim: {
                  select: {
                    ma_rap: true,
                    ten_rap: true,
                    CumRap: {
                      select: {
                        HeThongRap: {
                          select: {
                            ma_he_thong_rap: true,
                            ten_he_thong_rap: true,
                          },
                        },
                      },
                    },
                  },
                },
                Phim: { select: { ten_phim: true, ngay_khoi_chieu: true } },
              },
            },
            Ghe: { select: { ma_ghe: true, ten_ghe: true, loai_ghe: true } },
          },
        },
      },
    });

    if (checkUser) {
      if (checkUser.mat_khau == body.mat_khau) {
        res.json({
          statusCode: HttpStatus.OK,
          message: 'Lấy dữ liệu thành công',
          content: NguoiDung,
        });
      } else {
        throw new HttpException(
          'password not found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        'email not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(body: NguoiDung, res): Promise<string | any> {
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: { tai_khoan: body.tai_khoan },
    });

    if (checkUser) {
      throw new HttpException(
        'Tài khoản bị trùng',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      let checkEmail = await this.prisma.nguoiDung.findFirst({
        where: { email: body.email },
      });

      if (checkEmail) {
        throw new HttpException(
          'Email bị trùng',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        await this.prisma.nguoiDung.create({ data: body });

        res.json({
          statusCode: HttpStatus.OK,
          message: 'Thêm người dùng thành công',
          content: body,
        });
      }
    }
  }

  async updateUser(
    body: NguoiDungDto,
    taiKhoan: string,
    res,
  ): Promise<string | any> {
    console.log(body);
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: { tai_khoan: taiKhoan },
    });

    if (checkUser) {
      await this.prisma.nguoiDung.update({
        where: { tai_khoan: taiKhoan },
        data: body,
      });

      res.json({
        statusCode: HttpStatus.OK,
        message: 'Cập nhật thành công',
        data: body,
      });
    } else {
      throw new HttpException(
        'Tài khoản không tồn tại',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeUser(taiKhoan: string, res) {
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: { tai_khoan: taiKhoan },
    });

    if (checkUser) {
      await this.prisma.nguoiDung.delete({ where: { tai_khoan: taiKhoan } });

      res.json({
        statusCode: HttpStatus.OK,
        message: 'Xóa người dùng thành công',
      });
    } else {
      res.json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Tài khoản không tồn tại',
      });
    }
  }
}
