import {
  Controller,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { MovieTheaterService } from './movie-theater.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HeThongRap } from '@prisma/client';

@ApiBearerAuth()
@ApiTags(`QuanLyRap`)
@UseGuards(AuthGuard('jwt'))
@Controller('theater')
export class MovieTheaterController {
  constructor(private readonly movieTheaterService: MovieTheaterService) {}

  @Get(`LayThongTinHeThongRap`)
  getTheater(@Res() res): Promise<HeThongRap[]> {
    try {
      return this.movieTheaterService.getTheater(res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(`LayThongTinCumRapTheoHeThongRap`)
  getTheaterWithName(@Res() res, @Query(`maHeThongRap`) id: string) {
    try {
      return this.movieTheaterService.getTheaterWithName(res, id);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(`LayThongTinLichChieuPhimTheoHeThongRap`)
  getCalendarToTheater(@Query(`TenHeThongRap`) id: string, @Res() res) {
    try {
      return this.movieTheaterService.getCalendarToTheater(id, res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(`LayThongTinLichChieuPhim`)
  getCalendar(@Res() res, @Query(`maPhim`) maPhim: string) {
    try {
      return this.movieTheaterService.getCalendar(res, maPhim);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
