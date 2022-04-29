import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EditorComponent} from '../editor/editor.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  title = 'Library';
  anim = true;
  canevas: HTMLElement = undefined;

  constructor(public dialog: MatDialog) {
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


