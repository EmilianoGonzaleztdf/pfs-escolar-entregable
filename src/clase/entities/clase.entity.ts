import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";

@Entity({name : "clase"})
export class Clase {
  //atributos
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  @IsNotEmpty()
  nombre : string;


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