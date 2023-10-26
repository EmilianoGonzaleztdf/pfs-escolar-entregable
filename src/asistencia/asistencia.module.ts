import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { Asistencia } from './entities/asistencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseEstudiante } from 'src/clase/entities/clase_estudiante.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Asistencia, ClaseEstudiante])],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {}
