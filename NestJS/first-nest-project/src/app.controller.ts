import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // the above code is equivalent to the following code:
  // private readonly appService: AppService;
  // constructor(appService: AppService) {this.appService = appService};

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // constructor(@Inject('MY_REPOSITORY') private readonly repository: CatRepository{} ... )
}
