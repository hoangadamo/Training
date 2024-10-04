import { Injectable, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// userClass
// @Module({
//   imports: [CatsModule],
//   controllers: [AppController],
//   providers: [ { provide: AppService, useClass: AppService, } ]
// })
// export class AppModule {}

// useValue
// const mockCatsService = { /* mock implementation ... */ };
// @Module({
//   imports: [CatsModule],
//   controllers: [AppController],
//   providers: [{ provide: CatsService, useValue: mockCatsService, }, AppService],
// })
// export class AppModule {}

// useFactory
// const connectionFactory = {
//   provide: 'CONNECTION',
//   useFactory: (optionsProvider: OptionsProvider) => {
//       const options = optionsProvider.get();
//       return new DatabaseConnection(options); 
//   },
//   inject: [OptionsProvider], 
// };
// @Module({ 
//   providers: [connectionFactory],
// })
// export class AppModule {}

// useExisting
// @Injectable()
// class LoggerService { /* implementation details */ }
// const loggerAliasProvider = { 
//     provide: 'AliasedLoggerService', 
//     useExisting: LoggerService, 
// };
// @Module({ providers: [LoggerService, loggerAliasProvider], })
// export class AppModule {}


// @Module({ 
//   providers: [
//       {
//           provide: 'CAT_REPOSITORY',
//           useValue: new CatRepository(),
//       },
//   ],
// })
// export class AppModule {}

// const connectionFactory = { 
//   provide: 'CONNECTION',
//   useFactory: (optionsProvider: OptionsProvider) => {
//       const options = optionsProvider.get();
//       return new DatabaseConnection(options); 
//   },
//   inject: [OptionsProvider], 
// };
// @Module({ 
//   providers: [connectionFactory],
//   exports: ['CONNECTION'], 
// })
// export class AppModule {}
