import { Controller, Get, Post, Param, Req, HttpCode, Header, Res, Redirect, Query, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Observable, of } from 'rxjs';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  findAll(@Req() request: Request): string {
    console.log(request.method);
    return 'This action returns all cats';
  }
  // status code
  @Post()
  @HttpCode(204)
  create() {
    return 'This action adds a new cat';
  }
  // Headers
  @Post()
  @Header('Cache-Control', 'none')
  create1() {
    return 'This action adds a new cat';
  }
  @Post()
  create2(@Res() res) {
    res.header('Cache-Control', 'none').send('This action adds a new cat');
  }
  // Redirect
  // @Get() 
  // @Redirect('https://duypt.dev', 301)
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 301)
  getDocs(@Query('version') version ){
    if (version && version === '5'){
      return {url: 'https://docs.nestjs.com/v5/', statusCode: 301};
    }
  }

  // Route parameters 
  @Get(':id')
  findOne(@Param('id') id): string {
    return `This action returns a #${id} cat`
  }

  // Asynchronicity
  @Get()
  async findAll1(): Promise<any[]>{
    return [];
  }
    // RxJS 
  @Get()
  findAll2(): Observable<any[]>{
    return of([]);
  }

  @Post()
  async create3(@Body() createCatDto: CreateCatDto) { 
    return 'This action adds a new cat' 
  }

  // @Post()
  // create(@Body() createCatDto: CreateCatDto) {
  //   return this.catsService.create(createCatDto);
  // }

  // @Get()
  // findAll() {
  //   return this.catsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.catsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return this.catsService.update(+id, updateCatDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.catsService.remove(+id);
  // }
}
