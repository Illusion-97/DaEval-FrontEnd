import {Component} from '@angular/core';
import {FilterComponent} from '../filter/filter.component';

@Component({
  selector: 'app-filter-ville',
  templateUrl: './filter-ville.component.html',
  styleUrls: ['../filter/filter.component.css']
})
export class FilterVilleComponent extends FilterComponent {

  name = '';

  filter(): void {
    this.filtered =
      this.source.filter(ville => ville.name.toUpperCase().includes(this.name.toUpperCase().toUpperCase()));
  }

  titleChange(name: string) {
    this.name = name;
    this.filter();
  }
}
