import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';
import { CatsModule } from './cats/cats.module';
import { CoreModuleModule } from './core-module/core-module.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CatsModule, CoreModuleModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// @Module({
//   imports: [DatabaseModule.forRoot([User])],
//   exports: [DatabaseModule]
// })
// export class AppModule {}

