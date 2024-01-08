import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './books/book.module';
import { MulterModule } from '@nestjs/platform-express';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    MulterModule.register({
      dest: './uploads'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(<string>process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BookModule,
    AuthModule,
    UserModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
