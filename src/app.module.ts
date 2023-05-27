import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from './user/user.module';
import { MovieTheaterModule } from './movie-theater/movie-theater.module';
import { TicketModule } from './ticket/ticket.module';
  
@Module({
  imports: [
    MoviesModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MovieTheaterModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
