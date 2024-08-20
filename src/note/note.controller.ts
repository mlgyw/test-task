import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
  Get,
  Query,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { NoteService } from '@/note/note.service';
import { NoteDto, UpdateNoteDto, СreateNoteDto } from '@/note/dto/note.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { RequestWithUser } from '@/common/interfaces/request.interface';
import { PaginationQueryDto } from '@/common/dto/pagination.dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(
    @Body() createNoteDto: СreateNoteDto,
    @Req() req: RequestWithUser,
  ) {
    try {
      return await this.noteService.create(createNoteDto, req.user.id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getList(
    @Req() req: RequestWithUser,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    try {
      return await this.noteService.getList(req.user.id, paginationQuery);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneByID(
    @Param('id') noteID: string,
    @Req() req: RequestWithUser,
  ): Promise<NoteDto> {
    try {
      return await this.noteService.getOneByID(noteID, req.user.id);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOneByID(
    @Param('id') noteID: string,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    try {
      return await this.noteService.deleteOneByID(noteID, req.user.id);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOneByID(
    @Param('id') noteID: string,
    @Req() req: RequestWithUser,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<NoteDto> {
    try {
      return await this.noteService.updateOneByID(
        noteID,
        req.user.id,
        updateNoteDto,
      );
    } catch (err) {
      throw err;
    }
  }
}
