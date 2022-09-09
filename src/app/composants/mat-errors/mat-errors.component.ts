import {Component, Input, OnInit} from '@angular/core';
import {defaultErrorMessageMap} from '../../../environments/environment';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-mat-errors',
  templateUrl: './mat-errors.component.html',
  styleUrls: ['./mat-errors.component.css']
})
export class MatErrorsComponent implements OnInit {
  @Input()
  control: FormControl;
  defaultErrorMessageMap = defaultErrorMessageMap;

  constructor() {
  }

  ngOnInit(): void {
  }

}
