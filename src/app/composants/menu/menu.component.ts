import {Component, OnInit} from '@angular/core';
import {DTO_TYPES, FORM_BY_TYPE, ICON_BY_TYPE, ROUTE_BY_TYPE, TYPE_NAME} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {LibraryService} from '../../../services/library.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  countByType: BehaviorSubject<Map<DTO_TYPES, number>>;
  TYPE_NAME = TYPE_NAME;
  ROUTE_BY_TYPE = ROUTE_BY_TYPE;
  FORM_BY_TYPE = FORM_BY_TYPE;

  constructor(private service: LibraryService) {
  }

  getIcon(type: DTO_TYPES): string {
    return ICON_BY_TYPE.get(type);
  }

  ngOnInit(): void {
    this.countByType = this.service.countByType;
  }

  cleanNav() {
    this.service.parents.next([]);
  }

}
