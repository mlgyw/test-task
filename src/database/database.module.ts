import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports:[ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				uri: `${configService.get('MONGO_PREFIX')}://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get('MONGO_DB_NAME')}`
			})
		})
	],

	
})
export class DatabaseModule {
}
