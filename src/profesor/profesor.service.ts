import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(CiudadProfesor)
    private ciudadProfesorRepository: Repository<CiudadProfesor>,
  ) {}

  async create(createprofesorDto: CreateProfesorDto): Promise<boolean> {
    try {
      let profesor: Profesor = await this.profesorRepository.save(
        new Profesor(createprofesorDto.nombre, createprofesorDto.apellido),
      );
      if (profesor) return true;
      else return false;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se puede crear el profesor ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<CreateProfesorDto[]> {
    try {
      return await this.profesorRepository.find();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se puede obtener los profesores ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<CreateProfesorDto> {
    try {
      let profesor = await this.profesorRepository.findOne({ where: { id: id } });
      if (!profesor) {
        throw new Error('no se encuentra el profesor ');
      } else return profesor;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'no se pudo buscar el profesor ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number,createprofesorDto: CreateProfesorDto,): Promise<String> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let profesor: Profesor = await this.profesorRepository.findOne(criterio);
      if (!profesor)
        throw new Error('no se pudo encontrar la ciudad a modificar');
      else {
        let profesorNombreViejo = profesor.getNombre();
        let profesorApellidoViejo = profesor.getApellido();
        profesor.setNombre(createprofesorDto.nombre);
        profesor.setApellido(createprofesorDto.apellido);
        profesor = await this.profesorRepository.save(profesor);

        return (
          'se cambio el nombre: ' +
          profesorNombreViejo +
          ' por: ' +
          createprofesorDto.nombre +
          ' y el apellido: ' +
          profesorApellidoViejo +
          ' por: ' +
          createprofesorDto.apellido
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se puede actualizar los datos del profesor ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      let criterio: FindOneOptions = { where: { id: id } };
      let profesor: Profesor = await this.profesorRepository.findOne(criterio);
      if (!profesor) throw new Error('no se pudo eliminar el profesor');
      else await this.profesorRepository.remove(profesor);
      return {
        id: id,
        message: 'se elimino al profesor',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: ' error en profesor ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createDomicilio(body){
    try{
    const {ciudadId , profesorId , domicilio} = body;
    const profesor = await this.profesorRepository.findOne({ where: { id : profesorId}});
      if(!profesor)
        throw new Error('no existe el profesor');
    const ciudad = await this.ciudadRepository.findOne({ where: { id : ciudadId }});
      if(!ciudad)
        throw new Error('no existe la ciudad');
    const nuevo_domicilio = await this.ciudadProfesorRepository.findOne({where : { ciudadId : ciudadId , profesorId : profesorId}});
      if(nuevo_domicilio)
        throw new Error('el profesor ya tiene domicilio');
      return await this.ciudadProfesorRepository.save( new CiudadProfesor (ciudadId, profesorId, domicilio))
  } catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: ' error en profesor ' + error,
      },
      HttpStatus.NOT_FOUND,
    );
  }
  }
}