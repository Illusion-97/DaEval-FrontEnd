import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpEventType} from '@angular/common/http';
import {DTO_TYPES, FORM_BY_TYPE, ICON_BY_TYPE, NAME_BY_TYPE, ROUTE_BY_TYPE} from '../../../../environments/environment';
import {LibraryService} from '../../../../services/library.service';
import {ActiveRouteService} from '../../../../services/active-route.service';
import {EditorComponent} from '../../forms/editor/editor.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  type: DTO_TYPES = undefined;
  method: string;
  @Input() filtered: any[] = [];
  @Output() filteredChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  selected: any = undefined;
  previous: any = undefined;
  source: any[] = [];
  progressRef: NgProgressRef;
  icon = '';
  DTO_TYPES = DTO_TYPES;
  ROUTE_BY_TYPE = ROUTE_BY_TYPE;
  FORM_BY_TYPE = FORM_BY_TYPE;
  formInf: any;

  constructor(private router: Router, private route: ActivatedRoute,
              private service: LibraryService, private progress: NgProgress,
              private routeService: ActiveRouteService, private dialog: MatDialog) {
  }

  filter(): void { this.filtered = this.source.filter(() => true); }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('progressBar');
    this.route.data.subscribe((data) => {
      this.service.select.next({type: this.type = data['type'], selected: undefined});
      this.method = data['method'];
    });
    this.icon = ICON_BY_TYPE.get(this.type);
    this.routeService.params = this.route.snapshot.paramMap;
    this.service.select.subscribe(select => {
      if (select) {
        this.selected = select.selected;
      }
  });
    this.service.navigate.subscribe(previous => {
      if (previous) {
        this.previous = previous.selected;
      }
    });
    this.initFilter();
    this.get();
  }

  select(item) {
    this.selected = item;
    this.service.select.next({type: this.type, selected: item});
  }

  initFilter() {
    this.formInf = FORM_BY_TYPE.get(this.type).getObject();
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

  get() {
    if (!this.service) { return; }
    this.progressRef = (this.selected === undefined)
      ? this.progress.ref('progressBar')
      : this.progress.ref('cardBar');
    if (!this.progressRef.isStarted) {
      this.progressRef.start();
    }
    this.getPage();
  }

  private getPage() {
    const subscription = this.service.handle('post', this.type, 'FilteredByPage', this.formInf, undefined, 0, 10)
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.progressRef.complete();
          this.source = event.body;
          this.filter();
          subscription.unsubscribe();
        }
      });
  }

  getName(item: any): string {
    return NAME_BY_TYPE(this.type, item);
  }

  openDialog(): void {
    this.dialog.open(EditorComponent, {data: {selected: undefined, type: this.type, filter: true, params: this.routeService.params}})
      .afterClosed().subscribe(data => {
        if (data.submited) {
          this.getPage();
        }
    });
  }
}
