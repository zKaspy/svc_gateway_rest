import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, pipe } from 'rxjs';

/*
 * переписать
 * localhost:3000 не должно быть. Задавать через env
 * https://docs.nestjs.com/techniques/configuration
 * типы должны быть указны
 */

@Controller('users')
@ApiTags('Users microservice')
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const params = JSON.stringify(createUserDto);

    return this.httpService
      .post(`${process.env.SERVICE_URL}/users`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.httpService
      .get(`${process.env.SERVICE_URL}/users/${id}`)
      .pipe(map((response) => response.data));
  }

  @Get()
  getAll() {
    return this.httpService
      .get(`${process.env.SERVICE_URL}/users/`)
      .pipe(map((response) => response.data));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const params = JSON.stringify(updateUserDto);

    return this.httpService
      .patch(`${process.env.SERVICE_URL}/users/${id}`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.httpService
      .delete(`http://localhost:3030/users/${id}`)
      .pipe(map((response) => response.data));
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        imagesUrl: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@Body() data: string, @UploadedFile() file: Express.Multer.File) {
    const params = JSON.stringify(file);

    return this.httpService
      .post(`${process.env.SERVICE_URl}/users/upload`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  @Get('/images/:image')
  downloadFile() {
    return this.httpService
      .get(`${process.env.SERVICE_URl}/users/download`)
      .pipe(map((response) => response.data));
  }
}

/*
const { data } = await this.httpService.axiosRef.get(
    `http://localhost:3030/users/${id}`,
  );
return data;
*/
