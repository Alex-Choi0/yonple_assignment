import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';




@Module({
  // ProductsModule를 현 AppModule에 추가하였다.
  imports: [
  UsersModule,
  TypeOrmModule.forRoot(typeOrmConfig),
  ConfigModule.forRoot({
    isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
