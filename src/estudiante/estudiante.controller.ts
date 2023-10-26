import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudianteService.create(createEstudianteDto);
  }

  @Post('agregar-clase')
  async addClase(@Body() body:any):Promise<any>{
    return await this.estudianteService.addClase(body);
  }

  @Get()
  findAll(): Promise<Estudiante[]> {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Estudiante> {
    return this.estudianteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number,@Body() createEstudianteDto: CreateEstudianteDto,): Promise<String> {
    return this.estudianteService.update(id, createEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.estudianteService.remove(+id);
  }
}
