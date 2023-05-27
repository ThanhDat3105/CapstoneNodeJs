import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient, Phim, Banner } from '@prisma/client';
import { movieDto } from './Dto/movie.dto';

@Injectable()
export class MoviesService {
  prisma = new PrismaClient();

  async getMovies(res): Promise<Phim[] | any> {
    let data = await this.prisma.phim.findMany();

    res.json({
      statusCode: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công',
      content: data,
    });
  }

  async getBanner(res): Promise<Banner[] | any> {
    let data = await this.prisma.banner.findMany();

    res.json({
      statusCode: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công',
      content: data,
    });
  }

  async getInfoMovie(id: string, res): Promise<Phim | any> {
    let data = await this.prisma.phim.findFirst({
      where: { ma_phim: Number(id) },
    });

    if (data) {
      res.json({
        statusCode: HttpStatus.OK,
        message: 'Lấy dữ liệu thành công',
        content: data,
      });
    } else {
      res.json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Mã phim không tồn tại',
      });
    }
  }

  async saveAvatar(id: string, imgName: string, res): Promise<string | any> {
    let data = await this.prisma.phim.findFirst({
      where: { ma_phim: Number(id) },
    });

    if (data) {
      data.hinh_anh = imgName;
      await this.prisma.phim.update({ data, where: { ma_phim: Number(id) } });

      res.json({
        statusCode: HttpStatus.OK,
        message: 'Cập nhật dữ liệu thành công',
        content: data,
      });
    } else {
      res.json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Mã phim không tồn tại',
      });
    }
  }

  async createMovie(
    body: movieDto,

    res,
  ): Promise<string | any> {
    let date = new Date(body.ngay_khoi_chieu);
    let data: movieDto = {
      ten_phim: body.ten_phim,
      trailer: body.trailer,
      hinh_anh: body.hinh_anh,
      mo_ta: body.mo_ta,
      ngay_khoi_chieu: date,
      danh_gia: Number(body.danh_gia),
      hot: Boolean(body.hot),
      dang_chieu: Boolean(body.dang_chieu),
      sap_chieu: Boolean(body.sap_chieu),
    };

    await this.prisma.phim.create({ data });

    res.json({
      statusCode: HttpStatus.OK,
      message: 'Thêm phim thành công',
      content: data,
    });
  }

  async updateMovie(body: movieDto, id: string, res): Promise<string | any> {
    let date = new Date(body.ngay_khoi_chieu);

    let data: movieDto = {
      ten_phim: body.ten_phim,
      trailer: body.trailer,
      hinh_anh: body.hinh_anh,
      mo_ta: body.mo_ta,
      ngay_khoi_chieu: date,
      danh_gia: Number(body.danh_gia),
      hot: Boolean(body.hot),
      dang_chieu: Boolean(body.dang_chieu),
      sap_chieu: Boolean(body.sap_chieu),
    };

    await this.prisma.phim.update({ data, where: { ma_phim: Number(id) } });

    res.json({
      statusCode: HttpStatus.OK,
      message: 'Cập nhật dữ liệu thành công',
      content: data,
    });
  }

  async removeMovie(id: string, res): Promise<string | any> {
    let data = await this.prisma.phim.delete({
      where: { ma_phim: Number(id) },
    });

    if (data) {
      res.json({
        statusCode: HttpStatus.OK,
        message: 'Xóa phim thành công',
      });
    } else {
      res.json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'ID phim không tồn tại',
      });
    }
  }
}
