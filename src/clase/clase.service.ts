import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(Clase)
    private claseRepository: Repository<Clase>,
  ) {}

  async crearClase(createClaseDto: Clase): Promise<boolean> {
    //let claseACrear : Clase = new Clase(createClaseDto.nombre);
    //let claseGuardadaDB = await this.claseRepository.save(claseACrear);
    // esto es lo mismo que la linea de abajo
    let clase: Clase = await this.claseRepository.save(
      new Clase(createClaseDto.nombre),
    );
    if (clase) return true;
    else return false;
  }

  async buscarTodos(): Promise<Clase[]> {
    return await this.claseRepository.find();
  }

  async buscarPorId(id: number) {
    //const criterio : FindOneOptions = {where : {id: id}};
    //let clase : Clase = await this.claseRepository.findOne(criterio);
    // esto es lo mismo que la linea de abajo
    let clase = await this.claseRepository.findOne({ where: { id: id } });
    if (clase) return clase;
    else return null;
  }

  async actualizarClase(id: number, createClaseDto: Clase): Promise<String> {
    const criterio: FindOneOptions = { where: { id: id } };
    let clase: Clase = await this.claseRepository.findOne(criterio);
    let nombreViejo = clase.getNombre();
    if (clase) {
      clase.setNombre(createClaseDto.getNombre());
      clase = await this.claseRepository.save(clase);
      if (clase)
        return `el nombre de la clase: ${nombreViejo} se cambio por:  ${clase.getNombre}`;
      else 'no se pudo reemplazar';
    } else return 'no se pudo reemplazar';
  }

  async eliminarClase(id: number) {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let clase: Clase = await this.claseRepository.findOne(criterio);
      if (clase) {
        await this.claseRepository.remove(clase);
        return true;
      } else throw new Error('no se encontro la clase a eliminar');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'problemas en la clase' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
