import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";

@Entity({name : "ciudad_estudiante"})
export class CiudadEstudiante{

  @PrimaryGeneratedColumn()
  direccion: string;

  @ManyToOne(()=> Estudiante , estudiante => estudiante.domicilios)
  estudiante : Estudiante;

  @ManyToOne(()=> Ciudad , ciudad => ciudad.domicilios)
  ciudad: Ciudad;

  constructor(direccion:string){
    this.direccion = direccion;
  }
  
  public getDireccion():string{
    return this.direccion;
  }
  public setDireccion(direccion:string){
    this.direccion = direccion;
  }
}