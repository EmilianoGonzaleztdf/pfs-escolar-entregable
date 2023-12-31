import { Escuela } from "src/escuela/entities/escuela.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CiudadProfesor } from "./ciudad_profesor.entity";
import { CiudadEstudiante } from "./ciudad_estudiante.entity";

@Entity({name : "ciudad"})
export class Ciudad {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(()=> Escuela, escuela => escuela.ciudad) // le pasamos un metodo como parametro de a que entidad hace referencia - una ciudad tiene muchas escuelas
  escuela : Escuela[];

  @OneToMany(()=> CiudadProfesor, domiclios => domiclios.ciudad)
  domicilios : CiudadProfesor[];

  @OneToMany(()=> CiudadEstudiante, domiclios => domiclios.ciudad)
  domicelios : CiudadEstudiante[];


  constructor(nombre: string){
    this.nombre = nombre;
  };

  public getId():number{
    return this.id;
  };

  public getNombre():string{
    return this.nombre;
  };

  public setNombre(nombre:string){
    this.nombre = nombre;
  };
};
