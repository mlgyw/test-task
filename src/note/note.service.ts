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
import { FilterQuery, Types } from 'mongoose';
import { UserService } from '@/user/user.service';
import { ListResponse } from '@/common/types/list.type';
import { QueryDto } from '@/common/dto/query.dtos';
import { Note } from './schemas/note.schema';
import { createSearchFilter } from '@/common/filters/search.filter';
import { createDateFilter } from '@/common/filters/date.filter';
import { createPaginationParams } from '@/common/filters/pagination.filter';

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
    queryDto: QueryDto,
  ): Promise<ListResponse<NoteDto>> {
    try {
      const filters = this.createNoteFilters(userID, queryDto);
      const paginationParams = createPaginationParams(
        queryDto.page,
        queryDto.limit,
      );
      return await this.noteRepository.getList(filters, paginationParams);
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

  createTagsFilter(tags?: string): FilterQuery<Note> {
    const tagsArray = tags ? tags.split(',') : [];
    return tagsArray.length > 0 ? { tags: { $all: tagsArray } } : {};
  }

  createNoteFilters(userID: string, queryDto: QueryDto): FilterQuery<Note> {
    const userObjectId = new Types.ObjectId(userID);
    const { search, startDate, endDate, tags } = queryDto;

    return {
      ...createSearchFilter<Note>(search, ['topic', 'description']),
      ...createDateFilter(startDate, endDate),
      ...this.createTagsFilter(tags),
      userID: userObjectId,
    };
  }
}
