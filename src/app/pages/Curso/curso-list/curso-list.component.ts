import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data/data.service';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.scss']
})
export class CursoListComponent implements OnInit {

  lista: any[] = [];
  displayedColumns: string[] = ['abreviatura', 'nomCurso', 'credito', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  SelectFocus: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search';

  constructor(private dataService: DataService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.cursos().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
      console.log(data);
    });
  }

  setData(data) {
    const r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
