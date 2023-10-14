import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findById(id: number): Promise<CreateCiudadDto> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      if (ciudad) return ciudad;
      else throw new Error('no se encuentra la ciudad');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' Error en Ciudad ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async crearCiudad(createCiudadDto: CreateCiudadDto): Promise<boolean> {
    try {
      let ciudad: Ciudad = await this.ciudadRepository.save(
        new Ciudad(createCiudadDto.nombre),
      );
      if (ciudad) return true;
      else throw new Error(' no se pudo crear la ciudad');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: ' error en la ciudad ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async actualizarCiudadId(createCiudadDto : CreateCiudadDto , id : number) : Promise <String>{
    const criterio : FindOneOptions = {where : {id: id}};
    let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
    let ciudadVieja = ciudad.getNombre();
    if (!ciudad)
      throw new Error('no se pudo encontrar la ciudad a modificar');
    else 
      ciudad.setNombre(createCiudadDto.nombre);
      ciudad = await this.ciudadRepository.save(ciudad);
      return 'Ok  se cambio: ' + ciudadVieja + ' por: ' + createCiudadDto.nombre ;
  }
}
