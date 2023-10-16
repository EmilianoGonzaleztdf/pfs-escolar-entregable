import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CreateCiudadDto } from './dto/create-ciudad.dto';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get('raw')
  async getAllRaw(): Promise<CreateCiudadDto[]>{
    return await this.ciudadService.findAllRaw();
  }
  @Get('orm')
  async getAllOrm(): Promise<CreateCiudadDto[]>{
    return await this.ciudadService.findAllOrm();
  }
  @Get(':id')
  async getId(@Param('id') id:number): Promise<CreateCiudadDto>{
    return await this.ciudadService.findById(id);
  }
  @Post('crear')
  async crearCiudad(@Body() ciudad:CreateCiudadDto) : Promise<boolean>{
    return this.ciudadService.crearCiudad(ciudad);
  }
  @Put('actualizar/:id')
  async actualizarCiudadId(@Body() createCiudadDto, @Param('id') id:number) : Promise<String>{
    return this.ciudadService.actualizarCiudadId(createCiudadDto, id);
  }
  @Delete('eliminar/:id')
  async eliminarCiudadPorId(@Param('id') id:number): Promise<CreateCiudadDto>{
    return await this.ciudadService.eliminarCiudadPorId(id);
  }
}
