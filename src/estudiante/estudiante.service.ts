import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { ClaseEstudiante } from 'src/clase/entities/clase_estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
    @InjectRepository(ClaseEstudiante)
    private readonly claseEstudianteRepository: Repository<ClaseEstudiante>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto) {
    try {
      const estudiante: Estudiante = await this.estudianteRepository.save(
        new Estudiante(createEstudianteDto.nombre,createEstudianteDto.apellido,createEstudianteDto.fecha_nacimiento));
      if (estudiante)
        return `se creo estudiante ${estudiante.nombre}`
      else 
        throw new Error('no se creo el estudiante ');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se puede crear el estudiante ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async addClase(body):Promise<any>{
  try {
    const {claseId,estudianteId} = body;
    const estudiante = await this.estudianteRepository.findOne({where:{id:estudianteId}})
    if(!estudiante)
      return `error - no se encontre el estudiante con id ${estudianteId}`;
    const clase = await this.claseRepository.findOne({where:{id:claseId}})
    if(!clase)
      return 'error - no se encontro esa clase';
    const clase_estudiante = await this.claseEstudianteRepository.findOne({where:{claseId:claseId,estudianteId:estudianteId}})
    if(clase_estudiante)
      return 'error - el estudiante ya tiene asignada esa clase';
    return await this.claseEstudianteRepository.save(new ClaseEstudiante(estudianteId,claseId));
  } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se puede crear el estudiante ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<Estudiante[]> {
    try {
      return await this.estudianteRepository.find();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se puede obtener los estudiantes ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<Estudiante> {
    try {
      let estudiante = await this.estudianteRepository.findOne({
        where: { id: id } /*, relations : ['clases'] */,
      });
      if (!estudiante) {
        throw new Error('no se encuentra el estudiante ');
      } else return estudiante;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'no se pudo buscar el estudiante ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    createEstudianteDto: CreateEstudianteDto,
  ): Promise<String> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let estudiante: Estudiante =
        await this.estudianteRepository.findOne(criterio);
      if (!estudiante) throw new Error('no se pudo encontrar el estudiante');
      else {
        let estudianteNombreViejo = estudiante.getNombre();
        let estudianteApellidoViejo = estudiante.getApellido();
        let estudianteFechaNac_vieja = estudiante.getFechaNaciomiento();
        estudiante.setNombre(createEstudianteDto.nombre);
        estudiante.setApellido(createEstudianteDto.apellido);
        estudiante.setFechaNaciomiento(createEstudianteDto.fecha_nacimiento);
        estudiante = await this.estudianteRepository.save(estudiante);

        return (
          'se cambio el nombre: ' +
          estudianteNombreViejo +
          ' por: ' +
          createEstudianteDto.nombre +
          ' , el domicilio: ' +
          estudianteApellidoViejo +
          ' por: ' +
          createEstudianteDto.apellido +
          ' la fecha de nacimiento ' +
          estudianteFechaNac_vieja +
          ' por: ' +
          createEstudianteDto.fecha_nacimiento
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: ' no se puede actualizar los datos del estudiante ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      let criterio: FindOneOptions = { where: { id: id } };
      let estudiante: Estudiante =
        await this.estudianteRepository.findOne(criterio);
      if (!estudiante) throw new Error('no se pudo eliminar al estudiante');
      else await this.estudianteRepository.remove(estudiante);
      return {
        id: id,
        message: 'se elimino el estudiante',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: ' error en el estudiante ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
