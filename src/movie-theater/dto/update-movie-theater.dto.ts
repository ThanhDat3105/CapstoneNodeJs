import { PartialType } from '@nestjs/swagger';
import { CreateMovieTheaterDto } from './create-movie-theater.dto';

export class UpdateMovieTheaterDto extends PartialType(CreateMovieTheaterDto) {}
