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


  // controlador
  constructor(nombre: string) {
    this.nombre = nombre;
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
}