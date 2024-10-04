import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'schedule',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/modules/invoice/migrate/*{.ts,.js}'],
  synchronize: true,
});
