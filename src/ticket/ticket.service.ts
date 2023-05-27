import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient, NguoiDung } from '@prisma/client';
import { DatVe, Ghe, LichChieu } from './Dto/ticket.dto';

@Injectable()
export class TicketService {
  prisma = new PrismaClient();

  async getListTicket(id: string, res) {
    let thongTinPhim = await this.prisma.lichChieu.findMany({
      where: { ma_lich_chieu: Number(id) },
      include: { Phim: true },
    });

    let dangSachGhe = await this.prisma.ghe.findMany();

    res.json({
      statusCode: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công',
      content: { thongTinPhim, dangSachGhe },
    });
  }

  async bookTicket(user: NguoiDung, maLichChieu: string, maGhe: string, res) {
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: { tai_khoan: user.tai_khoan },
    });

    let calendar = await this.prisma.lichChieu.findFirst({
      where: { ma_lich_chieu: Number(maLichChieu) },
    });

    let codeChair = await this.prisma.ghe.findFirst({
      where: { ma_ghe: Number(maGhe) },
    });

    let checkTicket = await this.prisma.datVe.findFirst({
      where: { ma_ghe: Number(maGhe) },
    });

    let data: DatVe = {
      tai_khoan: user.tai_khoan,
      ma_lich_chieu: calendar.ma_lich_chieu,
      ma_ghe: codeChair.ma_ghe,
    };

    let dataChair: Ghe = { da_dat: 1, taiKhoanNguoiDat: user.tai_khoan };

    if (checkUser) {
      if (checkTicket) {
        throw new HttpException(
          'Ghế đã được đặt bởi người khác',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        await this.prisma.ghe.update({
          data: dataChair,
          where: { ma_ghe: Number(maGhe) },
        });
        await this.prisma.datVe.create({ data });
        res.json({
          statusCode: HttpStatus.OK,
          message: 'Đặt vé thành công',
        });
      }
    } else
      throw new HttpException(
        'Không tìm thấy người dùng',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  async createCalendar(body: LichChieu, res) {
    await this.prisma.lichChieu.create({ data: body });
    res.json({
      statusCode: HttpStatus.OK,
      message: 'Thêm lịch chiếu thành công',
    });
  }
}
