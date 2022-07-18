import { Component, OnInit } from '@angular/core';
import {DTO_TYPES, ROUTE_BY_TYPE, TYPE_NAME} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countByType: Map<DTO_TYPES, number> = new Map<DTO_TYPES, number>();
  TYPE_NAME = TYPE_NAME;
  ROUTE_BY_TYPE = ROUTE_BY_TYPE;

  constructor() { }

  ngOnInit(): void {
    Object.values(DTO_TYPES).filter((v) => !isNaN(Number(v))).forEach((value, index) => {
      this.countByType.set(index, 0);
    });
  }
}
