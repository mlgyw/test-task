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
import { QueryDto } from '@/common/dto/query.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ListResponse } from '@/common/types/list.type';
import { NOTE_DOESNT_DELETE, NOTE_DOESNT_EXIST } from '@/note/note.constants';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @ApiOperation({ summary: 'Create a new note' })
  @ApiBody({
    description: 'Note data to create a new note',
    type: СreateNoteDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Note successfully created',
    type: NoteDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data',
  })
  @ApiBearerAuth()
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
  @ApiExtraModels(ListResponse, NoteDto)
  @ApiOperation({ summary: 'Get all notes' })
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'get all notes',
    schema: {
      allOf: [{ $ref: getSchemaPath(ListResponse) }],
      properties: {
        items: {
          type: 'array',
          items: { $ref: getSchemaPath(NoteDto) },
        },
      },
    },
  })
  async getList(@Req() req: RequestWithUser, @Query() queryDto: QueryDto) {
    try {
      return await this.noteService.getList(req.user.id, queryDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get note by ID' })
  @ApiOkResponse({
    status: 200,
    description: 'Note successfully retrieved',
    type: NoteDto,
  })
  @ApiResponse({
    status: 404,
    description: NOTE_DOESNT_EXIST,
  })
  @ApiBearerAuth()
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
  @ApiOperation({ summary: 'Delete note by ID' })
  @ApiOkResponse({
    status: 200,
  })
  @ApiResponse({
    status: 400,
    description: NOTE_DOESNT_DELETE,
  })
  @ApiBearerAuth()
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
  @ApiOperation({ summary: 'Create a new note' })
  @ApiBody({
    description: 'Note data to create a new note',
    type: UpdateNoteDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Note successfully created',
    type: NoteDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data',
  })
  @ApiBearerAuth()
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
