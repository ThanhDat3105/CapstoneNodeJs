import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NguoiDung } from '@prisma/client';
import { LichChieu, tai_khoan } from './Dto/ticket.dto';

@ApiBearerAuth()
@ApiTags(`QuanLyDatVe`)
@UseGuards(AuthGuard('jwt'))
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get(`LayDanhSachPhongVe`)
  getListTicket(@Query(`maLichChieu`) id: string, @Res() res) {
    return this.ticketService.getListTicket(id, res);
  }

  @ApiBody({ type: tai_khoan })
  @Post(`DatVe`)
  bookTicket(
    @Body() user: NguoiDung,
    @Query('maLichChieu') maLichChieu: string,
    @Query('maGhe') maGhe: string,
    @Res() res,
  ) {
    return this.ticketService.bookTicket(user, maLichChieu, maGhe, res);
  }

  @Post(`TaoLichChieu`)
  createCalendar(@Body() body: LichChieu, @Res() res) {
    return this.ticketService.createCalendar(body, res);
  }
}
