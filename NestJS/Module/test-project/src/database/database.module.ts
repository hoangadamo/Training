import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.providers';

@Module({
    providers: [Connection]
})
export class DatabaseModule {
    static forRoot(entities = [], options?): DynamicModule{
        const providers = createDatabaseProviders(options, entities);
        return {
            module: DatabaseModule,
            providers: providers,
            exports: providers,
        };
    }
}
