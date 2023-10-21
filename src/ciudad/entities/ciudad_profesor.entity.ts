import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({name : "ciudad_profesor"})
export class CiudadProfesor{

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  direccion: string;

  @ManyToOne(()=> Profesor , profesor => profesor.domicilios)
  profesor : Profesor;

  @ManyToOne(()=> Ciudad , ciudad => ciudad.domicilios)
  ciudad: Ciudad;

  constructor(direccion:string){
    this.direccion = direccion;
  }
  public getId():number{
    return this.id;
  }
  public getDireccion():string{
    return this.direccion;
  }
  public setDireccion(direccion:string){
    this.direccion = direccion;
  }
}