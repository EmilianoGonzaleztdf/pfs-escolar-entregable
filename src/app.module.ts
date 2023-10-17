import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadModule } from './ciudad/ciudad.module';
import { ClaseModule } from './clase/clase.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EscuelaModule } from './escuela/escuela.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { AsistenciaModule } from './asistencia/asistencia.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'emiliano1',
      database: 'db_colegio',
      entities: [__dirname + '/**/**/**.entity{.ts,.js}'],
      synchronize: true, //modo desarrollador.
    }),
    CiudadModule,
    ClaseModule,
    ProfesorModule,
    EscuelaModule,
    EstudianteModule,
    AsistenciaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}