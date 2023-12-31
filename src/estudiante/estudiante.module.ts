import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { CiudadEstudiante } from 'src/ciudad/entities/ciudad_estudiante.entity';
import { ClaseEstudiante } from 'src/clase/entities/clase_estudiante.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Estudiante, Clase, CiudadEstudiante, ClaseEstudiante, Asistencia])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
