import { Global, Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

// Global Module là module mà các provider của nó có thể được sử dụng ở bất kỳ đâu trong ứng dụng mà không cần phải nhập module đó vào từng module cụ thể. Để tạo một global module, bạn sử dụng decorator @Global()

@Global() // make this module be global
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService){} // inject CatsService provider
}


