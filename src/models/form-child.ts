import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Select} from './Select';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class FormChild {
  @Input()
  object: Select;
  @Output()
  objectChange: EventEmitter<Select> = new EventEmitter<Select>();
  @Input()
  form!: FormGroup ;
  @Output()
  formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  id = new FormControl(0, Validators.required);
  version = new FormControl(0, Validators.required);
}
