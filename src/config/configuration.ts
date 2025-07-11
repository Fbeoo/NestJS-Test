import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfiguration : TypeOrmModuleOptions = {
    type: process.env.DB_CONNECTION as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
    synchronize: true,
};