import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: 'neptune',
  // entities: [File],
  migrations: ['dist/migrations/**/*.js'],
  synchronize: false,
});
