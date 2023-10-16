import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";

//atributos
@Entity({name : "profesor"})
export class Profesor {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  @IsNotEmpty()
  nombre : string;

  @Column()
  @IsNotEmpty()
  apellido : string;
  //constructor
  constructor(nombre: string,apellido: string ){
    this.nombre = nombre;
    this.apellido =apellido;
  }
  //metodos get&set
  public getId(){
    return this.id;
  }
  public getNombre(){
    return this.nombre;
  }
  public setNombre(nombre: string){
    this.nombre = nombre;
  }
  public getApellido(){
    return this.apellido;
  }
  public setApellido(apellido: string){
    this.apellido =apellido;
  }
}