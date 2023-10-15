import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";

@Entity({name : "escuela"})
export class Escuela {
  //atributos
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  @IsNotEmpty()
  nombre : string;

  @Column()
  @IsNotEmpty()
  domicilio : string;

  // controlador
  constructor(nombre: string, domicilio: string) {
    this.nombre = nombre;
    this.domicilio = domicilio;
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
  public getDomicilio(){
    return this.domicilio;
  }
  public setDomicilio(domicilio: string){
    this.domicilio = domicilio;
  }
}