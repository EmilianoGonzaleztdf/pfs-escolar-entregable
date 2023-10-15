import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseController } from './clase.controller';
import { Clase } from './entities/clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Clase])],
  controllers: [ClaseController],
  providers: [ClaseService],
})
export class ClaseModule {}
