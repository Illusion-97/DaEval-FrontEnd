import {Component, OnInit} from '@angular/core';
import {DTO_TYPES, FORM_BY_TYPE, ROUTE_BY_TYPE, TYPE_NAME} from '../../../environments/environment';
import {LibraryService} from '../../../services/library.service';
import {EditorComponent} from '../../composants/forms/editor/editor.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countByType: Map<DTO_TYPES, number> = new Map<DTO_TYPES, number>();
  TYPE_NAME = TYPE_NAME;
  ROUTE_BY_TYPE = ROUTE_BY_TYPE;
  FORM_BY_TYPE = FORM_BY_TYPE;

  constructor(private service: LibraryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    Object.values(DTO_TYPES).filter((v) => !isNaN(Number(v))).forEach((value, index) => {
      this.service.handle('get', index, 'Count').subscribe({
        next: count => {
          this.countByType.set(index, count['body']);
        },
        error: () => this.countByType.set(index, 0)
      });
    });
  }

  openDialog(type: DTO_TYPES): void {
    this.dialog.open(EditorComponent, {data: {selected: undefined, type: type}});
  }
}
