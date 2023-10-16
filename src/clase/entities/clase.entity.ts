import { IsNotEmpty } from "class-validator";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,  } from "typeorm";

@Entity({name : "clase"})
export class Clase {
  //atributos
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  @IsNotEmpty()
  nombre : string;

  @ManyToOne(()=> Profesor , profesor => profesor.clase)
  @JoinColumn({name : "fk_id_profesor"})
  profesor : Profesor;
  
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