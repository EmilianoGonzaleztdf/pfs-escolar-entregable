import { Clase } from "src/clase/entities/clase.entity";

export class CreateEstudianteDto {
  readonly nombre: string;
  readonly apellido : string;
  readonly fecha_nacimiento : string;
  readonly fk_clase : Clase[];
}
