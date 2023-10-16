import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";

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
