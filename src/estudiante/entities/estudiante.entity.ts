import { IsNotEmpty } from "class-validator";
import { Asistencia } from "src/asistencia/entities/asistencia.entity";
import { CiudadEstudiante } from "src/ciudad/entities/ciudad_estudiante.entity";
import { Clase } from "src/clase/entities/clase.entity";
import { ClaseEstudiante } from "src/clase/entities/clase_estudiante.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn,  } from "typeorm";

@Entity({name : "estudiante"})
export class Estudiante {
//atributos
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  @IsNotEmpty()
  nombre : string;

  @Column()
  @IsNotEmpty()
  apellido : string;

  @Column({ type: 'date' })
  fecha_nacimiento: string;

  /*@ManyToMany(()=> Clase , clases => clases.estudiantes)
  clases : Clase[];
*/
  @OneToMany(()=> ClaseEstudiante , claseEstudiante => claseEstudiante.estudiante)
  claseEstudiante : ClaseEstudiante[];

  @OneToMany(()=> CiudadEstudiante, domiclios => domiclios.estudiante)
  domicilios : Estudiante[];

  @OneToMany(()=>Asistencia,asistencia=>asistencia.claseEstudiante)
  asistencias:Asistencia[];

//constructor
constructor(nombre : string, apellido : string, fecha_nacimiento : string){
  this.nombre = nombre;
  this.apellido = apellido;
  this.fecha_nacimiento = fecha_nacimiento
}
//metodos get
public getId(){
  return this.id;
}
public getNombre(){
  return this.nombre;
}
public getApellido(){
  return this.apellido;
}
public getFechaNaciomiento(){
  return this.fecha_nacimiento
};
// metodos set
public setNombre(nombre:string){
  this.nombre = nombre;
}
public setApellido(apellido:string){
  this.apellido = apellido;
}
public setFechaNaciomiento(fecha_nacimiento:string){
  this.fecha_nacimiento = fecha_nacimiento;
}

}
