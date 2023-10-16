import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
      let datos = await this.ciudadRepository.query('select * from ciudad');
      datos.forEach((element) => {
        let ciudad: Ciudad = new Ciudad(element['nombre']);
        this.ciudades.push(ciudad);
      });
      if (this.ciudades) return this.ciudades;
      else throw new Error('no se pueden mostrar las ciudades');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se pueden obtener las ciudades' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllOrm(): Promise<CreateCiudadDto[]> {
    try {
      return await this.ciudadRepository.find();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se puede obtener las ciudades ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
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
  async actualizarCiudadId(createCiudadDto: CreateCiudadDto,id: number,): Promise<String> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      if (!ciudad)
        throw new Error('no se pudo encontrar la ciudad a modificar');
      else {
        let ciudadVieja = ciudad.getNombre();
        ciudad.setNombre(createCiudadDto.nombre);
        ciudad = await this.ciudadRepository.save(ciudad);
        return (
          'Ok  se cambio: ' + ciudadVieja + ' por: ' + createCiudadDto.nombre
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se puede actualizar la ciudad ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async eliminarCiudadPorId(id: number): Promise<any> {
    try {
      let criterio: FindOneOptions = { where: { id: id } };
      let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      if (!ciudad) throw new Error('no se pudo eliminar la Ciudad');
      else await this.ciudadRepository.remove(ciudad);
      return {
        id: id,
        message: 'se elimino la ciudad',
      };
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
}
