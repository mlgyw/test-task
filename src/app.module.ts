import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/user/user.module';
import { AuthModule } from '@/auth/auth.module';
import { NoteModule } from '@/note/note.module';
import { FileModule } from '@/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    AuthModule,
    NoteModule,
    FileModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
