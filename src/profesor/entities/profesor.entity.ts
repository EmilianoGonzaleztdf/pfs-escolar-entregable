import { IsNotEmpty } from "class-validator";
import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,  } from "typeorm";

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

  @OneToMany(()=> Clase , clase => clase.profesor)
  clases : Clase[];

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