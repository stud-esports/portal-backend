import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Public } from '../auth/decorators/public-url.decorator';
import { FilesService } from './files.service';
import { editFileName, imageFileFilter } from './helpers';
import { DESTINATION } from './constants';
import { FilesUploadDto, FileUploadDto } from './dto';

@ApiTags('Файлы')
@Controller('files')
export class FilesController {
  constructor(private _filesService: FilesService) {}

  @ApiOperation({ summary: 'Сохранение одного файла' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Файл',
    type: FileUploadDto,
  })
  @Public()
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: DESTINATION,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      // todo добавить проверку расширения
    }),
  )
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    return { path: '/photos/' + file?.filename };
  }

  @ApiOperation({ summary: 'Сохранение нескольких фото' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Список файлов',
    type: FilesUploadDto,
  })
  @Public()
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('file', 5, {
      storage: diskStorage({
        destination: DESTINATION,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      // todo добавить проверку расширения
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const response = [];
    files?.forEach((file) => {
      const fileReponse = '/photos/' + file?.filename;
      response.push(fileReponse);
    });
    return response;
  }

  @ApiOperation({ summary: 'Удаление фото' })
  @Public()
  @Delete()
  async deleteFileByNameAndFolder(@Body() dto: any) {
    return await this._filesService.deleteFile(dto.fileName, 'photos');
  }

  @ApiOperation({ summary: 'Показать url всех фото' })
  @Public()
  @Get('show-all-photos')
  async showPhotos() {
    return this._filesService.showPhotosFolder();
  }
}
