import { ClaseEstudiante } from "src/clase/entities/clase_estudiante.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, } from "typeorm";

@Entity('asistencia')
export class Asistencia {
  @PrimaryColumn()
  claseId: number;

  @PrimaryColumn()
  estudianteId : number;

  @Column({ type: 'date' })
  fecha: Date;

  constructor(claseId : number , estudianteId : number, fecha : Date ) {
    this.claseId = claseId;
    this.estudianteId = estudianteId;
    this.fecha = fecha;
  }

  @ManyToOne(()=>ClaseEstudiante,claseEstudiante=>claseEstudiante.asistencia)
  @JoinColumn()
  claseEstudiante:ClaseEstudiante;
}
