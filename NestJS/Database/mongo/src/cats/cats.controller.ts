import { BadRequestException, Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Req, Res} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from 'src/schemas/cat.schema';
import { Request, Response } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto, @Res() res: Response): Promise<void> {
    try {
      const cat: Cat = await this.catsService.create(createCatDto);
      res.cookie("hello", 123456789); // set a cookie item
      // res.cookie("accessToken", "", { maxAge: 0 }); // remove cookie item
      res.status(HttpStatus.OK).json(cat);
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'missing info' });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  }


  // Đảm bảo rằng một trong hai điều kiện sau là đúng: hoặc tham số nhận được trong phương thức findOne() là một number hoặc một ngoại lệ được đưa ra trước khi trình route handler được gọi.
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
      console.log(req.cookies);
      return this.catsService.findOne(id);
  }

}
