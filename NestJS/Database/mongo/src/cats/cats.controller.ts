import { BadRequestException, Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from 'src/schemas/cat.schema';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto, @Res() res: Response): Promise<void> {
    try {
      const cat: Cat = await this.catsService.create(createCatDto);
      res.status(HttpStatus.OK).json(cat);
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'missing info' });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  }
}
