import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { BoardsModule } from './module/boards.module';
import { LikeModule } from './module/userLike.module';
import { UsersModule } from './module/users.module';




@Module({
  // ProductsModule를 현 AppModule에 추가하였다.
  imports: [
  UsersModule,
  BoardsModule,
  LikeModule,
  TypeOrmModule.forRoot(typeOrmConfig),
  ConfigModule.forRoot({
    isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
