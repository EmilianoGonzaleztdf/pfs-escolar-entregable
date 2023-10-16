import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Profesor])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
