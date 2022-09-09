import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpEventType} from '@angular/common/http';
import {
  CHILD_TYPES_BY_TYPE,
  DTO_TYPES,
  FORM_BY_TYPE,
  ICON_BY_TYPE,
  NAME_BY_TYPE,
  ROUTE_BY_TYPE,
  TYPE_NAME
} from '../../../../environments/environment';
import {LibraryService} from '../../../../services/library.service';
import {ActiveRouteService} from '../../../../services/active-route.service';
import {EditorComponent} from '../../forms/editor/editor.component';
import {MatDialog} from '@angular/material/dialog';
import {FormInfo} from '../../../../models/form-info';
import {ReturnObject} from '../../../../models/return-object';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @ViewChild('widthRef') widthRef;

  type: DTO_TYPES;
  method: string;
  @Input() filtered: any[] = [];
  @Output() filteredChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  selected: any = undefined;
  previous: any = undefined;
  source: any[] = [];
  sourceTotal = 0;
  pageSize = 10;
  progressRef: NgProgressRef;
  icon = '';
  DTO_TYPES = DTO_TYPES;
  ROUTE_BY_TYPE = ROUTE_BY_TYPE;
  FORM_BY_TYPE = FORM_BY_TYPE;
  CHILD_TYPES_BY_TYPE = CHILD_TYPES_BY_TYPE;
  form: FormInfo;
  formInf: any;
  opened = 0;
  menuWidth = 0;

  constructor(private router: Router, private route: ActivatedRoute,
              private service: LibraryService, private progress: NgProgress,
              private routeService: ActiveRouteService, private dialog: MatDialog) {
  }

  get infos() {
    return this.form.controls.filter(control => control.showed);
  }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('progressBar');
    this.route.data.subscribe((data) => {
      this.service.select.next({type: this.type = data['type'], selected: undefined});
      this.routeService.data.next(data);
      this.method = data['method'];
    });
    this.icon = ICON_BY_TYPE.get(this.type);
    this.routeService.params = this.route.snapshot.paramMap;
    this.service.select.subscribe(select => {
      if (select) {
        this.selected = select.selected;
      } else {
        this.getCount();
      }
    });
    this.service.navigate.subscribe(previous => {
      if (previous) {
        this.previous = previous.selected;
      }
    });
    this.service.update.subscribe(() => this.getCount());
    this.initFilter();
    this.getCount();
  }

  select(item) {
    this.selected = item;
    this.service.select.next({type: this.type, selected: item});
  }

  initFilter() {
    this.form = FORM_BY_TYPE.get(this.type);
    this.formInf = this.form.getObject();
    const params = this.routeService.params;
    params.keys.filter(key => Object.keys(this.formInf).includes(key)).forEach(key => {
      const val = +params.get(key);
      this.formInf[key] = (val);
      /*const controlInf = formInf.getControlInf(key);
      if (controlInf) {
        const control = controlInf.control;
        control.setValue(val);
        control.disable();
      }*/
    });
  }

  getCount() {
    if (!this.progressRef.isStarted) {
      this.progressRef.start();
    }
    const subscription = this.service.handle('post', this.type, 'FilteredCount', this.formInf)
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.progressRef.complete();
          this.sourceTotal = event.body;
          this.getPage(0);
          subscription.unsubscribe();
        }
      });
  }

  getPage(page: number) {
    if (!this.progressRef.isStarted) {
      this.progressRef.start();
    }
    const subscription = this.service.handle('post', this.type, 'FilteredByPage', this.formInf, undefined, page, this.pageSize)
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.progressRef.complete();
          this.source = event.body;
          this.progressRef.complete();
          subscription.unsubscribe();
        }
      });
  }

  getWidth(id: number) {
    this.menuWidth = this.widthRef.nativeElement.parentElement.parentElement.offsetWidth;
    console.log(this.menuWidth);
    this.opened = id;
  }

  getName(item: any): string {
    return NAME_BY_TYPE(this.type, item);
  }

  openDialog(): void {
    this.dialog.open(EditorComponent, {data: {selected: undefined, type: this.type, filter: true, params: this.routeService.params}})
      .afterClosed().subscribe(data => {
      if (data.submited) {
        this.getCount();
      }
    });
  }

  getDtoName(type: DTO_TYPES): string {
    return TYPE_NAME.get(type);
  }

  navigate(item: any, destType: DTO_TYPES) {
    const parents = this.service.parents.value;
    const parent: ReturnObject = {name: this.getName(item), type: this.type, url: this.router.routerState.snapshot.url};
    parents.push(parent);
    this.service.parents.next(parents);
    this.router.navigate([this.router.routerState.snapshot.url + '/' + item.id + ROUTE_BY_TYPE.get(destType)])
      .catch(reason => console.log(reason));
  }
}
