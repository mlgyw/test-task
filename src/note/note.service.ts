import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import {
  NOTE_CANNOT_CREATE_ERROR,
  NOTE_CANNOT_GET_LIST_ERROR,
} from '@/note/note.constants';
import { NoteRepository } from '@/note/note.repository';
import { NoteDto, UpdateNoteDto, СreateNoteDto } from '@/note/dto/note.dto';
import { Types } from 'mongoose';
import { UserService } from '@/user/user.service';
import { ListResponse } from '@/common/types/list.type';
import { PaginationQueryDto } from '@/common/dto/pagination.dto';

@Injectable()
export class NoteService {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly userService: UserService,
  ) {}

  async create(createNoteDto: СreateNoteDto, userID: string): Promise<NoteDto> {
    try {
      const userObjectID = userID ? new Types.ObjectId(userID) : null;
      const noteDto: NoteDto = {
        ...createNoteDto,
        userID: userObjectID,
      };
      const note = await this.noteRepository.create(noteDto);

      this.userService.addNoteToUser(userID, note.id);
      return note;
    } catch (err) {
      throw new BadRequestException(NOTE_CANNOT_CREATE_ERROR);
    }
  }

  async getList(
    userID: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<ListResponse<NoteDto>> {
    try {
      return await this.noteRepository.getList(userID, paginationQuery);
    } catch (err) {
      throw new UnprocessableEntityException(NOTE_CANNOT_GET_LIST_ERROR);
    }
  }

  async getOneByID(noteID: string, userID: string): Promise<NoteDto> {
    try {
      return await this.noteRepository.getOneById(noteID, userID);
    } catch (err) {
      throw err;
    }
  }

  async deleteOneByID(noteID: string, userID: string): Promise<void> {
    try {
      return await this.noteRepository.deleteOneById(noteID, userID);
    } catch (err) {
      throw err;
    }
  }

  async updateOneByID(
    noteID: string,
    userID: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<NoteDto> {
    try {
      return await this.noteRepository.updateOneById(
        noteID,
        userID,
        updateNoteDto,
      );
    } catch (err) {
      throw err;
    }
  }
}
