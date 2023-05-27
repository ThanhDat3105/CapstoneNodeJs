import { ApiProperty } from '@nestjs/swagger';

export class userLogin {
  @ApiProperty({ description: 'taiKhoan', type: String })
  taiKhoan: string;

  @ApiProperty({ description: 'matKhau', type: String })
  mat_khau: string;
}

export class user {
  @ApiProperty({ description: 'tai_khoan', type: String })
  tai_khoan: string;

  @ApiProperty({ description: 'ho_ten', type: String })
  ho_ten: string | null;

  @ApiProperty({ description: 'emai', type: String })
  email: string | null;

  @ApiProperty({ description: 'so_dt', type: String })
  so_dt: string | null;

  @ApiProperty({ description: 'mat_khau', type: String })
  mat_khau: string | null;

  @ApiProperty({ description: 'loai_nguoi_dung', type: String })
  loai_nguoi_dung: string | null;
}

export interface userInfo<M, T> {
  tai_khoan: string;
  ho_ten: string | null;
  emai: string | null;
  so_dt: string | null;
  mat_khau: string | null;
  loai_nguoi_dung: string | null;
  ma_loai_nguoi_dung: M;
  thong_tin_dat_ve: T;
}

export class NguoiDungDto {
  @ApiProperty({ description: 'ho_ten', type: String })
  ho_ten: string | null;

  @ApiProperty({ description: 'email', type: String })
  email: string | null;

  @ApiProperty({ description: 'so_dt', type: String })
  so_dt: string | null;

  @ApiProperty({ description: 'mat_khau', type: String })
  mat_khau: string | null;

  @ApiProperty({ description: 'loai_nguoi_dung', type: String })
  loai_nguoi_dung: string | null;
}

export interface profileUser {
  ma_he_thong_rap: number | null;
  ten_he_thong_rap: string | null;
  ma_cum_rap: number | null;
  ten_cum_rap: string | null;
  ma_rap: number | null;
  ten_rap: string | null;
  ma_ghe: number | null;
  ten_ghe: number | null;
  loai_ghe: string | null;
}
