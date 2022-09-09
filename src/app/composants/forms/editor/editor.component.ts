import {Component, Inject, OnInit, Optional} from '@angular/core';
import {LibraryService} from '../../../../services/library.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select} from '../../../../models/Select';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {AntiAbuseService} from '../../../../services/anti-abuse.service';
import {DTO_TYPES, FORM_BY_TYPE, NAME_BY_TYPE, TYPE_NAME} from '../../../../environments/environment';
import {ControlInfo, ControlInputType, FormInfo} from '../../../../models/form-info';
import {BehaviorSubject, map, Subscription} from 'rxjs';
import {HttpEventType} from '@angular/common/http';
import {ActiveRouteService} from '../../../../services/active-route.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  canSetValue = new BehaviorSubject(false);
  countdown?: BehaviorSubject<number>;
  progressRef: NgProgressRef;
  object: Select;
  formInf: FormInfo;
  DTO_TYPE = DTO_TYPES;
  TYPE_NAME = TYPE_NAME;
  CONTROL_TYPE = ControlInputType;
  subscriptions: Subscription[] = [];
  filter = false;

  constructor(public dialogRef: MatDialogRef<EditorComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Select,
              private service: LibraryService, private progress: NgProgress, public abuseGard: AntiAbuseService,
              private routeService: ActiveRouteService) {
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());
      this.formInf.form.reset();
      this.formInf.form.enable();
    });
  }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('editorBar');
    this.object = this.data;
    this.formInf = FORM_BY_TYPE.get(this.object.type);
    this.canSetValue.subscribe(can => {
      if (can) {
        this.formInf.form.patchValue(this.object.selected ? this.object.selected : this.routeService.paramsObject());
      }
    });
    const c = this.formInf.controls.filter(control => control.inputType === ControlInputType.SELECT);
    if (c.length > 0) {
      this.countdown = new BehaviorSubject<number>(c.length);
      this.countdown.subscribe(n => {
        if (!n) {
          console.log('CanSet');
          this.canSetValue.next(true);
          this.countdown.complete();
          this.countdown = undefined;
        }
      });
      c.forEach(control => this.enableSelect(control));
    } else {
      this.canSetValue.next(true);
    }
  }

  onNoClick(submited: boolean, result?: any): void {
    this.dialogRef.close({submited: submited, result: result});
  }

  submit() {
    this.onNoClick(true, this.formInf.form.value);
  }

  remove() {
    this.abuseGard.engage(this.object.selected);
    this.progressRef.start();
    this.service.handle('delete', this.object.type, 'ById?id=' + this.object.selected.id).subscribe(rep => {
      if (rep.type === HttpEventType.Response) {
        this.service.update.emit(undefined);
        this.abuseGard.setFree(this.object);
        this.progressRef.complete();
        this.onNoClick(true);
      }
    });
  }

  getName(type: DTO_TYPES, item: any): string {
    return NAME_BY_TYPE(type, item);
  }

  enableSelect(controlInf: ControlInfo) {
    const required = this.formInf.controls.find(control => control.name === controlInf.requiredControlName);
    if (required) {
      if (!this.object.selected) {
        controlInf.showed = true;
      }
      this.subscriptions.push(required.control.statusChanges.subscribe(status => {
        if (status === 'VALID') {
          controlInf.control.enable();
          this.getNextBatch(controlInf);
        } else {
          controlInf.control.disable();
        }
        if (!required.control.pristine && required.control.touched) {
          controlInf.showed = true;
          controlInf.control.reset();
          console.log(controlInf.name + ' reseted');
          controlInf.setSource();
        }
      }));
      if (this.object.selected && Object.keys(this.object.selected).includes(controlInf.name)) {
        this.getSourceTotal(controlInf);
        this.service.handle('get', controlInf.sourceType, 'ById?id=' + this.object.selected[controlInf.name])
          .subscribe(res => {
            if (res.type === HttpEventType.Response) {
              this.getNextBatch(controlInf, res.body);
            }
          });
      } else {
        this.getNextBatch(controlInf);
      }
    } else {
      this.getNextBatch(controlInf);
    }
  }

  getNextBatch(controlInf: ControlInfo, current?: any) {
    if (!controlInf.sourcetotal) {
      this.getSourceTotal(controlInf);
    }
    let vals: Map<string, string> | undefined;

    if (controlInf.method) {
      vals = new Map();
      this.formInf.controls.filter(inf => inf.control.value).forEach(inf => {
        vals.set(inf.name, inf.control.value);
      });
    }
    const max = 10;
    this.service.getForSelect(controlInf.sourceType,
      Math.floor(controlInf.currTotal / max), max, controlInf.method, vals).pipe(map(res => {
      if (current) {
        res.push(current);
      }
      return res;
    })).subscribe(
      result => {
        controlInf.source.next(result);
        if (this.countdown) {
          this.countdown.next(this.countdown.getValue() - 1);
        }
      }
    );
  }

  private getSourceTotal(controlInf: ControlInfo) {
    this.service.handle('get', controlInf.sourceType, 'Count').subscribe({
      next: count => controlInf.sourcetotal = count['body'],
      error: () => controlInf.sourcetotal = 0
    });
  }
}
