import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Jeu} from '../../../models/jeu';
import {EditorComponent} from '../editor/editor.component';
import {MatDialog} from '@angular/material/dialog';
import {LibraryService} from '../../../services/library.service';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {AntiAbuseService} from '../../../services/anti-abuse.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() selected: Jeu = undefined;
  @Output() selectedChange: EventEmitter<Jeu> = new EventEmitter<Jeu>();
  progressRef: NgProgressRef;

  constructor(private dialog: MatDialog, private service: LibraryService, private progress: NgProgress, private abuseGard: AntiAbuseService) {
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('cardBar');
  }

  update() {
    const copy = {...this.selected};
    copy.played = !this.selected.played;
    this.progressRef.start();
    this.service.save(copy).subscribe(jeu => {
      this.service.update.emit(jeu);
      this.abuseGard.setFree(jeu.id);
    });
  }


  openDialog(): void {
    this.dialog.open(EditorComponent, {data: this.selected});
  }
}

function structuredClone(selected: Jeu) {
  throw new Error('Function not implemented.');
}

