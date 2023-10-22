import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  @Get()
  findAll() : Promise<CreateProfesorDto[]> {
    return this.profesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) : Promise<CreateProfesorDto> {
    return this.profesorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() createProfesorDto): Promise<String> {
    return this.profesorService.update(id, createProfesorDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: number) : Promise<any> {
    return this.profesorService.remove(id);
  }
  @Post('agregarDomicilio')
  async createDomicilio(@Body() body: any): Promise<any> {
    return this.profesorService.createDomicilio(body)
  }
}
