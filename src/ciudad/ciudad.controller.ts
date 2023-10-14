import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
//import { CreateCiudadDto } from './dto/create-ciudad.dto';
//import { UpdateCiudadDto } from './dto/update-ciudad.dto';

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

}
