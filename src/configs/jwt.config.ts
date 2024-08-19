import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (configService: ConfigService) : Promise<JwtModuleOptions> => {
	return {
		secret: configService.get('JWT_SECRET'),
		signOptions: {
      	expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRY') || '15m',
    },
	}
}