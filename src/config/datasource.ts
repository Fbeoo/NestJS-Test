import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
    type: 'postgres' as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/../database/migration/*.ts'],
});