import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { Escuela } from './entities/escuela.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class EscuelaService {
  constructor(
    @InjectRepository(Escuela)
    private escuelaRepository: Repository<Escuela>,
  ) {}

  async create(createEscuelaDto: CreateEscuelaDto): Promise<boolean> {
    try {
      let escuela: Escuela = await this.escuelaRepository.save(
        new Escuela(createEscuelaDto.nombre, createEscuelaDto.domicilio),
      );
      if (escuela) return true;
      else return false;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se puede crear la escuela ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<CreateEscuelaDto[]> {
    try {
      return await this.escuelaRepository.find();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se puede obtener las escuelas ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<CreateEscuelaDto> {
    try {
      let escuela = await this.escuelaRepository.findOne({ where: { id: id } });
      if (!escuela) {
        throw new Error('no se encuentra la escuela ');
      } else return escuela;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'no se pudo buscar la escuela ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number,createEscuelaDto: CreateEscuelaDto,): Promise<String> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let escuela: Escuela = await this.escuelaRepository.findOne(criterio);
      if (!escuela)
        throw new Error('no se pudo encontrar la ciudad a modificar');
      else {
        let escuelaNombreViejo = escuela.getNombre();
        let escuelaDomilicioViejo = escuela.getDomicilio();
        escuela.setNombre(createEscuelaDto.nombre);
        escuela.setDomicilio(createEscuelaDto.domicilio);
        escuela = await this.escuelaRepository.save(escuela);

        return (
          'se cambio el nombre: ' +
          escuelaNombreViejo +
          ' por: ' +
          createEscuelaDto.nombre +
          ' y el domicilio ' +
          escuelaDomilicioViejo +
          ' por: ' +
          createEscuelaDto.domicilio
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

  async remove(id: number): Promise<any> {
    try {
      let criterio: FindOneOptions = { where: { id: id } };
      let escuela: Escuela = await this.escuelaRepository.findOne(criterio);
      if (!escuela) throw new Error('no se pudo eliminar la escuela');
      else await this.escuelaRepository.remove(escuela);
      return {
        id: id,
        message: 'se elimino la escuela',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: ' error en la escuela ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
