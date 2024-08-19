import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '@/configs/jwt.config';
import { AuthService } from '@/auth/auth.service';
import { UserModule } from '@/user/user.module';
import { AuthController } from '@/auth/auth.conroller';

@Module({
  imports: [
    JwtModule.registerAsync({
		imports: [ConfigModule],
		inject:[ConfigService],
		useFactory: getJwtConfig
	}),
	UserModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
