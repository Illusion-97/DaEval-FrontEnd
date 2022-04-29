import {Component, OnInit} from '@angular/core';
import {Jeu} from '../../../models/jeu';
import {LibraryService} from '../../../services/library.service';
import {HttpEventType} from '@angular/common/http';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  filter: boolean = undefined;
  selected: Jeu = undefined;
  jeux: Jeu[] = undefined;
  progressRef: NgProgressRef;

  constructor(private service: LibraryService, private progress: NgProgress) {
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('progressBar');
    this.get(undefined);
    this.service.update.subscribe(keep => {
      this.get(keep);
    });
  }

  select(jeu: Jeu) {
    this.selected = jeu;
  }

  setFilter(filter?: boolean) {
    this.filter = filter;
    this.get(this.selected);
  }

  get(jeu: Jeu) {
    this.progressRef = (this.selected === undefined)
      ? this.progress.ref('progressBar')
      : this.progress.ref('cardBar');
    if (!this.progressRef.isStarted) {
      this.progressRef.start();
    }
    const subscription = this.service.all().subscribe(event => {
      if (event.type === HttpEventType.Response) {
        if (this.progressRef.isStarted) {
          this.progressRef.complete();
        }
        this.selected = jeu;
        this.jeux = event.body;
        subscription.unsubscribe();
      }
    });
  }
}
