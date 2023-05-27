import { ApiProperty } from '@nestjs/swagger';

export class userLogin {
  @ApiProperty({ description: 'taiKhoan', type: String })
  taiKhoan: string;

  @ApiProperty({ description: 'matKhau', type: String })
  mat_khau: string;
}
