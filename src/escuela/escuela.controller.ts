import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { CreateEscuelaDto } from './dto/create-escuela.dto';


@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  @Post()
  create(@Body() createEscuelaDto: CreateEscuelaDto) {
    return this.escuelaService.create(createEscuelaDto);
  }

  @Get()
  findAll() : Promise<CreateEscuelaDto[]> {
    return this.escuelaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) : Promise<CreateEscuelaDto> {
    return this.escuelaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() createCiudadDto): Promise<String> {
    return this.escuelaService.update(id, createCiudadDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: number) : Promise<any> {
    return this.escuelaService.remove(id);
  }
}
