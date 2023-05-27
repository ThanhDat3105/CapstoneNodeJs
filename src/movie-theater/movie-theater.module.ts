import { Module } from '@nestjs/common';
import { MovieTheaterService } from './movie-theater.service';
import { MovieTheaterController } from './movie-theater.controller';

@Module({
  controllers: [MovieTheaterController],
  providers: [MovieTheaterService]
})
export class MovieTheaterModule {}
