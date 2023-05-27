import { ApiProperty } from '@nestjs/swagger';

export class DatVe {
  tai_khoan: string | null;
  ma_lich_chieu: number | null;
  ma_ghe: number | null;
}

export class Ghe {
  da_dat: number | null;
  taiKhoanNguoiDat: string | null;
}

export class tai_khoan {
  @ApiProperty({ description: 'tai_khoan', type: String })
  tai_khoan: string | null;
}

export class LichChieu {
  @ApiProperty({ description: 'ma_rap', type: Number })
  ma_rap: number | null;

  @ApiProperty({ description: 'ma_phim', type: Number })
  ma_phim: number | null;

  @ApiProperty({ description: 'ngay_gio_chieu', type: Date })
  ngay_gio_chieu: Date | null;

  @ApiProperty({ description: 'gia_ve', type: Number })
  gia_ve: number | null;
}
