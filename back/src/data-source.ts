import { DataSource, DataSourceOptions } from "typeorm"
import path from "node:path";
import "dotenv/config";

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
    const migrationsPath: string = path.join(__dirname, "./migrations/**.{ts,js}");

    if(!process.env.DATABASE_URL) {
        throw new Error("The DATABASE_URL environment variable is not defined.")
    }

    const dbUrl: string = process.env.DATABASE_URL;

    return {
        type: "postgres",
        url: dbUrl,
        synchronize: false,
        logging: false,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    }
}   

export const AppDataSource = new DataSource(dataSourceConfig())