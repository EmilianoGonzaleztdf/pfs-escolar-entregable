import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseController } from './clase.controller';
import { Clase } from './entities/clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Clase, Profesor])],
  controllers: [ClaseController],
  providers: [ClaseService],
})
export class ClaseModule {}
