import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HeThongRap, PrismaClient } from '@prisma/client';

@Injectable()
export class MovieTheaterService {
  prisma = new PrismaClient();

  async getTheater(res): Promise<HeThongRap[] | any> {
    let data = await this.prisma.heThongRap.findMany();
    res.json({
      statusCode: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công',
      content: data,
    });
  }

  async getTheaterWithName(res, id: string) {
    let data = await this.prisma.heThongRap.findMany({
      where: { ma_he_thong_rap: Number(id) },
      select: {
        CumRap: {
          select: {
            ma_cum_rap: true,
            ten_cum_rap: true,
            dia_chi: true,
            ma_he_thong_rap: true,
            RapPhim: true,
          },
        },
      },
    });

    res.json({
      statusCode: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công',
      content: data,
    });
  }

  async getCalendarToTheater(id: string, res) {
    let data = await this.prisma.lichChieu.findMany({
      where: { RapPhim: { CumRap: { HeThongRap: { ten_he_thong_rap: id } } } },
      include: { Phim: true },
    });

    res.json({
      statusCode: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công',
      content: data,
    });
  }

  async getCalendar(res, maPhim: string) {
    let data = await this.prisma.lichChieu.findMany({
      where: { ma_phim: Number(maPhim) },
      select: {
        ma_lich_chieu: true,
        ngay_gio_chieu: true,
        gia_ve: true,
        ma_rap: true,
        RapPhim: {
          select: {
            ten_rap: true,
            CumRap: {
              select: {
                dia_chi: true,
                ma_cum_rap: true,
                ten_cum_rap: true,
                HeThongRap: {
                  select: {
                    ma_he_thong_rap: true,
                    ten_he_thong_rap: true,
                    logo: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.json({
      statusCode: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công',
      content: data,
    });
  }
}
