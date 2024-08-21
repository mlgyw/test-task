import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Note, NoteDocument } from '@/note/schemas/note.schema';
import { NoteDto, UpdateNoteDto } from '@/note/dto/note.dto';
import { ListResponse } from '@/common/types/list.type';
import { PaginationQueryDto } from '@/common/dto/pagination.dto';
import {
  NOTE_DOESNT_DELETE,
  NOTE_DOESNT_EXIST,
  NOTE_DOESNT_UPDATE,
} from '@/note/note.constants';

@Injectable()
export class NoteRepository {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: NoteDto): Promise<Note> {
    try {
      const createdNote = new this.noteModel(createNoteDto);
      return await createdNote.save();
    } catch (err) {
      throw err;
    }
  }

  async getList(
    userID: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<ListResponse<Note>> {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;
    const userObjectId = new Types.ObjectId(userID);

    const [notes, totalCount] = await Promise.all([
      this.noteModel
        .find({ userID: userObjectId })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.noteModel.countDocuments({ userID: userObjectId }).exec(),
    ]);

    return { items: notes, totalCount };
  }

  async getOneById(noteID: string, userID: string): Promise<Note> {
    try {
      const noteObjectId = new Types.ObjectId(noteID);
      const userObjectID = new Types.ObjectId(userID);
      const note = await this.noteModel
        .findOne({ _id: noteObjectId, userID: userObjectID })
        .exec();

      if (!note) {
        throw new NotFoundException(NOTE_DOESNT_EXIST);
      }
      return note;
    } catch (err) {
      throw err;
    }
  }

  async deleteOneById(noteID: string, userID: string): Promise<void> {
    const noteObjectId = new Types.ObjectId(noteID);
    const userObjectId = new Types.ObjectId(userID);

    const result = await this.noteModel
      .deleteOne({ _id: noteObjectId, userID: userObjectId })
      .exec();

    if (result.deletedCount === 0) {
      throw new BadRequestException(NOTE_DOESNT_DELETE);
    }
  }

  async updateOneById(
    noteID: string,
    userID: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    const noteObjectId = new Types.ObjectId(noteID);
    const userObjectId = new Types.ObjectId(userID);

    const note = await this.noteModel
      .findOneAndUpdate(
        { _id: noteObjectId, userID: userObjectId },
        updateNoteDto,
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();

    if (!note) {
      throw new NotFoundException(NOTE_DOESNT_UPDATE);
    }

    return note;
  }
}
