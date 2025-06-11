import { AppDataSource } from './data-source'
import 'reflect-metadata'

export const initDatabase = async () => {
    try {
        await AppDataSource.initialize(); 
        console.log("Base de datos inicializada correctamente");
        return AppDataSource;
    } catch (ex) {
        console.log("Error al inicializar la base de datos");
        throw ex;
    }
}
