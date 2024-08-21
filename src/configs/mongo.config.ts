import { ConfigService } from '@nestjs/config';

export const getMongoUrl = async (configService: ConfigService): Promise<{uri: string}> => {
	return {
		uri : `${configService.get('MONGO_PREFIX')}://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get('MONGO_DB_NAME')}`
	}
}