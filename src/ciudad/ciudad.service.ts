import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import { CreateCiudadDto } from './dto/create-ciudad.dto';
//import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCiudadDto } from './dto/create-ciudad.dto';

@Injectable()
export class CiudadService {
  private ciudades: Ciudad[] = [];

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  async findAllRaw(): Promise<CreateCiudadDto[]> {
    this.ciudades = [];
    let datos = await this.ciudadRepository.query('select * from ciudad');
    datos.forEach((element) => {
      let ciudad: Ciudad = new Ciudad(element['nombre']);
      this.ciudades.push(ciudad);
    });
    return this.ciudades;
  }
  async findAllOrm(): Promise<CreateCiudadDto[]> {
    return await this.ciudadRepository.find();
  }

  async findById(id: number): Promise<CreateCiudadDto>{
    try{
    const criterio : FindOneOptions = { where: { id: id } };
    let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
    if(ciudad)
      return ciudad;
    else
      throw new Error("no se encuentra la ciudad");
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error : " Error en Ciudad " + error},HttpStatus.NOT_FOUND)
      };
    }
  }
