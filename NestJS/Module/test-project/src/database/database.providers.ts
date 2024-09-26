import { Provider } from '@nestjs/common';
import { Connection } from './connection.providers';

export function createDatabaseProviders(options?, entities = []): Provider[] {
  return [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const connection = new Connection(options);
        await connection.connect();
        return connection;
      },
    },
    ...entities.map(entity => ({
      provide: entity,
      useFactory: (connection: Connection) => connection.getRepository(entity),
      inject: ['DATABASE_CONNECTION'],
    })),
  ];
}
