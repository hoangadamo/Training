import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connectDB } from './connectDB/connectDB';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [connectDB, UsersModule, PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
