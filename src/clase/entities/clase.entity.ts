import { IsNotEmpty } from "class-validator";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn,  } from "typeorm";
import { ClaseEstudiante } from "./clase_estudiante.entity";

@Entity({name : "clase"})
export class Clase {
  //atributos
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  @IsNotEmpty()
  nombre : string;

  @ManyToOne(()=> Profesor , profesor => profesor.clases)
  @JoinColumn({name : "fk_id_profesor"})
  profesor : Profesor;

  @ManyToOne(()=> Escuela , escuela => escuela.clases)
  @JoinColumn({name : "fk_id_escuela"})
  escuela : Escuela

  @OneToMany(()=> ClaseEstudiante , claseEstudiante => claseEstudiante.estudiante)
  claseEstudiante : ClaseEstudiante[];

/*  @ManyToMany(()=> Estudiante , estudiantes => estudiantes.clases)
  @JoinTable({name : "clase-estudiante"})
  estudiantes : Estudiante[];*/

  // constructor
  constructor(nombre: string) {
    this.nombre = nombre;
  }

  //metodos get
  public getId(){
    return this.id;
  }
  public getNombre(){
    return this.nombre;
  }
  //metodos set
  public setNombre(nombre: string){
    this.nombre = nombre;
  }
}