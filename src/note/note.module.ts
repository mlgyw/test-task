import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from '@/note/schemas/note.schema';
import { NoteService } from '@/note/note.service';
import { NoteController } from '@/note/note.controller';
import { NoteRepository } from '@/note/note.repository';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    UserModule,
  ],
  providers: [NoteRepository, NoteService],
  controllers: [NoteController],
  exports: [NoteService],
})
export class NoteModule {}
