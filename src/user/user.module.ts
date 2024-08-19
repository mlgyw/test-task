import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/user/schemas/user.schema';
import { UserRepository } from '@/user/user.repository';
import { UserService } from '@/user/user.service';
import { UserController } from '@/user/user.contoller';



@Module({
	imports:[
		MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
	],
	providers: [UserRepository, UserService],
	controllers : [UserController],
	exports: [UserService]
})
export class UserModule {}
