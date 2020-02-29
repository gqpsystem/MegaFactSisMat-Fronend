import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/data/data.service';
import { TurnoEditComponent } from '../turno-edit/turno-edit.component';
import { Turno } from 'src/app/model/turno.model';

@Component({
  selector: 'app-turno-list',
  templateUrl: './turno-list.component.html',
  styleUrls: ['./turno-list.component.scss']
})
export class TurnoListComponent implements OnInit {

  lista: any[] = [];
  displayedColumns: string[] = ['idTurno', 'turno', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  SelectFocus: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search';

  constructor(private dataService: DataService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.turnos().getAll().subscribe(data=>this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
  }

  setData(data) {
    const r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectRow(event) {
    this.SelectFocus = event.idTurno;
  }

  openDialog(turn: any): void {
    const turno = turn != null ? turn : new Turno();
    const dialogRef = this.dialog.open(TurnoEditComponent, {
      data: turno
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  

}
