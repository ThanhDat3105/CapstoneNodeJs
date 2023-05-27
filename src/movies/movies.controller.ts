import { Banner, Phim } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Param,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto, fileDto, movieDto } from './Dto/movie.dto';

@ApiBearerAuth()
@ApiTags('QuanLyPhim')
@UseGuards(AuthGuard('jwt'))
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('/LayDanhSachPhim')
  getMovies(@Res() res): Promise<Phim[]> | string {
    try {
      return this.moviesService.getMovies(res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(`/LayDanhSachBanner`)
  getBanner(@Res() res): Promise<Banner[]> {
    try {
      return this.moviesService.getBanner(res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(`/LayThongTinPhim`)
  getInfoMovie(@Query('ma_phim') id: string, @Res() res): Promise<Phim> {
    try {
      return this.moviesService.getInfoMovie(id, res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'upload', type: FileUploadDto })
  @UseInterceptors(
    FileInterceptor('fileUpload', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, Date.now() + '_' + file.originalname),
      }),
    }),
  )
  @Post(`/CapNhatHinhPhim`)
  uploadAva(
    @Query(`id`) id: string,
    @UploadedFile() file: fileDto,
    @Res() res,
  ): Promise<string> {
    try {
      return this.moviesService.saveAvatar(id, file.filename, res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(`ThemPhim`)
  createMovie(@Body() body: movieDto, @Res() res): Promise<string> {
    try {
      return this.moviesService.createMovie(body, res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(`CapNhatPhim`)
  @UseInterceptors(
    FileInterceptor('fileUpload', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, Date.now() + '_' + file.originalname),
      }),
    }),
  )
  updateMovie(
    @Query('ma_phim') id: string,
    @Body() body: movieDto,

    @Res() res,
  ): Promise<string> {
    try {
      return this.moviesService.updateMovie(body, id, res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(`XoaPhim`)
  removeMovie(@Query(`ma_phim`) id: string, @Res() res): Promise<string> {
    try {
      return this.moviesService.removeMovie(id, res);
    } catch (error) {
      throw new HttpException('Lỗi BE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
