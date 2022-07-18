import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EditorComponent} from '../editor/editor.component';
import {DTO_TYPES, ROUTE_BY_TYPE} from '../../../environments/environment';
import {HttpEventType} from '@angular/common/http';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  title = 'Library';
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
    this.dialog.open(EditorComponent);
  }

  handleCanevas() {
    if (this.canevas) {
      this.anim = !this.anim;
      (this.anim) ? this.canevas.removeAttribute('stopped') : this.canevas.setAttribute('stopped', 'true');
    }
  }
}


