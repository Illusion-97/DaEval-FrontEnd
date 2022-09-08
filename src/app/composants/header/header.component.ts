import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EditorOldComponent} from '../editor/editorOld.component';
import {DTO_TYPES, ROUTE_BY_TYPE} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  title = 'DaEval';
  anim = true;
  canevas: HTMLElement = undefined;
  DTO_TYPES = DTO_TYPES;
  ROUTE_BY_TYPE = ROUTE_BY_TYPE;

  constructor(private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.canevas = document.querySelector('.c');
  }

  openDialog(): void {
    this.dialog.open(EditorOldComponent);
  }

  handleCanevas() {
    if (this.canevas) {
      this.anim = !this.anim;
      (this.anim) ? this.canevas.removeAttribute('stopped') : this.canevas.setAttribute('stopped', 'true');
    }
  }
}


