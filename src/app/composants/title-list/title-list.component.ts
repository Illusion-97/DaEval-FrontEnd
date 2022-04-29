import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Jeu} from '../../../models/jeu';

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.css']
})
export class TitleListComponent implements OnInit {
  @Input() selected: Jeu = undefined;
  @Output() selectedChange: EventEmitter<Jeu> = new EventEmitter<Jeu>();
  filter = 'all';
  @Input() jeux: Jeu[] = undefined;
  value = '';

  constructor() {
  }

  ngOnInit() {
  }

  select(jeu: Jeu) {
    this.selected = jeu;
    this.selectedChange.emit(this.selected);
  }

}
