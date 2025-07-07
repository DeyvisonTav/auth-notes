
import { DataSource } from 'typeorm';
import "dotenv/config";
import { User } from '../../../domain/entities/user';
import { Notes } from '../../../domain/entities/notes';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          User,
          Notes,
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
