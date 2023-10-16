import { Module } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { EscuelaController } from './escuela.controller';
import { Escuela } from './entities/escuela.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Escuela, Ciudad, Profesor])],
  controllers: [EscuelaController],
  providers: [EscuelaService],
})
export class EscuelaModule {}
