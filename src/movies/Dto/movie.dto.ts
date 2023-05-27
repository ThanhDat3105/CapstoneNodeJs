import { ApiProperty } from '@nestjs/swagger';

export class movieDto {
  // @ApiProperty({ description: 'ma_phim', type: Number })
  // ma_phim: number;

  @ApiProperty({ description: 'ten_phim', type: String })
  ten_phim: string;

  @ApiProperty({ description: 'trailer', type: String })
  trailer: string;

  @ApiProperty({ description: 'hinh_anh', type: String })
  hinh_anh: string;

  @ApiProperty({ description: 'mo_ta', type: String })
  mo_ta: string;

  @ApiProperty({ description: 'ngay_khoi_chieu', type: Date })
  ngay_khoi_chieu: Date;

  @ApiProperty({ description: 'danh_gia', type: Number })
  danh_gia: number;

  @ApiProperty({ description: 'hot', type: Boolean })
  hot: boolean;

  @ApiProperty({ description: 'dang_chieu', type: Boolean })
  dang_chieu: boolean;

  @ApiProperty({ description: 'sap_chieu', type: Boolean })
  sap_chieu: boolean;
}

export type fileDto = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  fileUpload: any;
}
