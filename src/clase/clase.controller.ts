import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { Clase } from './entities/clase.entity';

@Controller('clase')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  // CRUD

  // READ 
  @Get('buscarTodos')
  async buscarTodos(): Promise<Clase[]> {
    return await this.claseService.buscarTodos();
  }
  @Get('buscar/:id')
  async buscarPorId(@Param('id') id: number) : Promise<Clase>{
    return await this.claseService.buscarPorId(id);
  }
  // CREATE
  @Post('crearClase')
  async crearClase(@Body() clase: Clase) : Promise<boolean>{
    return await this.claseService.crearClase(clase);
  }
  // UPDATE
  @Put('actualizarClase/:id')
  async actualizarClase (@Body() clase:Clase, @Param('id') id : number) : Promise<String>{
    return await this.claseService.actualizarClase(id, clase);
  }
  // DELETE
  @Delete('eliminarClase/:id')
  async eliminarClase (@Param('id') id : number) : Promise<boolean>{
    return await this.claseService.eliminarClase(id);
  }
}
