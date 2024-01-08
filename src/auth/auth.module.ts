import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConstant } from './constants/constant';

@Module({
  imports: [JwtModule.register({
    secret: jwtConstant.secret,
    signOptions: {expiresIn : '3600s'}, 
  })],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
