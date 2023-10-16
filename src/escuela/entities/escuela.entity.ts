import { IsNotEmpty } from "class-validator";
import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,  } from "typeorm";

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
// relacion fk
  @ManyToOne(()=> Ciudad , ciudad=> ciudad.escuela)
  @JoinColumn({name : "fk_id_ciudad"})
  ciudad : Ciudad;

  @OneToMany(()=> Clase , clase=> clase.escuela)
  clase : Clase[];

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
  public getDomicilio(){
    return this.domicilio;
  }
  public setNombre(nombre: string){
    this.nombre = nombre;
  }
  public setDomicilio(domicilio: string){
    this.domicilio = domicilio;
  }
}