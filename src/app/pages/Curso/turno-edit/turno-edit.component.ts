import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-turno-edit',
  templateUrl: './turno-edit.component.html',
  styleUrls: ['./turno-edit.component.scss']
})
export class TurnoEditComponent implements OnInit {

  id: number;
  form: FormGroup;

  constructor(private dataService: DataService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TurnoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initFormBuilder();
    this.id = this.data.idTurno;
    console.log(this.id);
    this.loadDataFrom();
  }

  initFormBuilder(){
    this.form=this.formBuilder.group({
      idTurno:[null],
      turno:[null,Validators.compose([Validators.required])],
      descripcion:[null,Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.id != null && this.data.idTurno > 0) {
      this.dataService.turnos().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
      });
    }
  }

  save() {
    if (this.id != null && this.data.idTurno > 0) {
      //update
      this.dataService.turnos().update(this.form.value).subscribe(data => {
        this.dataService.turnos().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      //insert
      this.dataService.turnos().create(this.form.value).subscribe(data => {
        this.dataService.turnos().getAll().subscribe(cuent => {
          this.dataService.providers().cambio.next(cuent);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.dialogRef.close();
  }

}
