import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Clase } from "./clase.entity";

@Entity({name : "clase_estudiante"})
export class ClaseEstudiante{

  constructor(estudianteId : number, claseId : number){
    this.estudianteId = estudianteId;
    this.claseId = claseId;
  }

  @PrimaryColumn()
  estudianteId: number;

  @PrimaryColumn()
  claseId : number;


  @ManyToOne(()=> Estudiante, estudiante =>estudiante.claseEstudiante)
  @JoinColumn()
  estudiante : Estudiante;

  @ManyToOne(()=> Clase , clase => clase.claseEstudiante)
  @JoinColumn() 
  clase : Clase;

}