import { Injectable } from '@angular/core';
import { UnidadService } from './unidad.service';
import { ProviderService } from '../provider/provider.service';
import { CursoService } from './curso.service';
import { TurnoService } from './turno.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private provider: ProviderService,
    private unidad: UnidadService,
    private curso:CursoService,
    private turno:TurnoService
  ) { }

  providers(): ProviderService {
    return this.provider;
  }

  unidadMedidas(): UnidadService {
    return this.unidad;
  }

  cursos():CursoService{
    return this.curso;
  }

  turnos():TurnoService{
    return this.turno;
  }

}
