import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DTO_TYPES} from '../environments/environment';
import {BehaviorSubject, map, Observable, scan} from 'rxjs';


export class FormInfo {
  editable: boolean;
  form: FormGroup;
  controls: ControlInfo[];
  defaultValues: { [p: string]: any } = [];

  constructor(controls: ControlInfo[], private fb: FormBuilder, editable: boolean = true) {
    this.editable = editable;
    this.controls = controls;
    this.getForm(this.controls);
  }

  getForm(controls: ControlInfo[]) {
    const formControlConfig: { [p: string]: any } = [];
    controls.forEach(controlInf => {
      this.getFormControls(formControlConfig, controlInf);
    });
    formControlConfig['id'] = new FormControl(0);
    formControlConfig['version'] = new FormControl(0);
    this.form = this.fb.group(formControlConfig);
  }

  getFormControls(formControls: { [p: string]: any }, controlInf: ControlInfo) {
    if (controlInf.control) {
      formControls[controlInf.name] = controlInf.control;
      this.defaultValues[controlInf.name] = controlInf.control.value;
    } else if (controlInf.rangedControl) {
      controlInf.rangedControl.forEach(nestedInf => {
        this.getFormControls(formControls, nestedInf);
      });
    }
  }

  getObject() {
    return this.form.value;
  }

  getControlInf(name: string) {
    return this.controls.find(control => control.name === name);
  }
}

export enum ControlInputType {
  TEXT, TEXTAREA, SELECT, DATE_RANGE, NOTE, PASSWORD, RADIO
}

export class ControlInfo {
  label: string;
  name: string;
  control: FormControl;
  inputType: ControlInputType;
  showed: boolean;
  enabled: boolean;
  holder: string;
  sourceType?: DTO_TYPES;
  sourceObs: Observable<any[]>;
  sourcetotal?: number;
  currTotal = 0;
  source: BehaviorSubject<any[]>;
  rangedControl?: ControlInfo[];
  method?: string;
  requiredControlName?: string;

  constructor(label: string, name: string, control: FormControl,
              inputType: ControlInputType, holder: string, showed: boolean, sourceType?: DTO_TYPES,
              rangedControl?: ControlInfo[], method?: string, requiredControlName?: string) {
    this.label = label;
    this.name = name;
    this.control = control;
    this.inputType = inputType;
    this.showed = showed;
    this.holder = holder;
    this.sourceType = sourceType;
    this.rangedControl = rangedControl;
    this.method = method;
    this.requiredControlName = requiredControlName;
    this.enabled = !requiredControlName;
    if (!this.enabled) {
      this.control.disable();
    }
    this.setSource();
  }

  setSource() {
    this.source = new BehaviorSubject<any[]>([]);
    this.sourceObs = this.source.asObservable().pipe(
      scan((acc, curr) => {
        return [...acc, ...curr];
      }, [])
    ).pipe(
      map(data => {
        const ids = [];
        const filtered = data.filter(r => {
          if (ids.includes(r.id)) {
            return false;
          } else {
            ids.push(r.id);
            return true;
          }
        });
        this.currTotal = filtered.length;
        return filtered;
      })
    );
  }
}
