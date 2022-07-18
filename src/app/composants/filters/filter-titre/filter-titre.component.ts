import { Component, OnInit } from '@angular/core';
import {FilterComponent} from '../filter/filter.component';

@Component({
  selector: 'app-filter-titre',
  templateUrl: './filter-titre.component.html',
  styleUrls: ['../filter/filter.component.css']
})
export class FilterTitreComponent extends FilterComponent {

  titre = '';

  filter(): void {
    this.filtered =
      this.source.filter(
        titrePro => titrePro.titre.toUpperCase().includes(this.titre.toUpperCase().toUpperCase())
          || titrePro.titreCourt.toUpperCase().includes(this.titre.toUpperCase().toUpperCase()))
    ;
  }

  titleChange(titre: string) {
    this.titre = titre;
    this.filter();
  }
}
