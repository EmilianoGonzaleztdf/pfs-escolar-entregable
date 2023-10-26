import { ClaseEstudiante } from "src/clase/entities/clase_estudiante.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, } from "typeorm";

@Entity('asistencia')
export class Asistencia {
  @PrimaryColumn({name : 'claseEstudianteEstudianteId'})
  claseId: number;

  @PrimaryColumn({name : 'claseEstudianteClaseId'})
  estudianteId : number;

  @CreateDateColumn()
  fecha: Date;

  constructor(claseId : number , estudianteId : number ) {
    this.claseId = claseId;
    this.estudianteId = estudianteId;
  }

  @ManyToOne(()=>ClaseEstudiante,claseEstudiante=>claseEstudiante.asistencia)
  @JoinColumn()
  claseEstudiante:ClaseEstudiante;
}
