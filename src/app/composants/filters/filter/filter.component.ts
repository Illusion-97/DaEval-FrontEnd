import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {ActivatedRoute, ChildActivationEnd, ParamMap, Router} from '@angular/router';
import {HttpEventType} from '@angular/common/http';
import {DTO_TYPES, ICON_BY_TYPE, ROUTE_BY_TYPE} from '../../../../environments/environment';
import {LibraryService} from '../../../../services/library.service';
import {NAME_BY_TYPE} from '../../../../environments/environment';
import {filter} from 'rxjs';

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
  params: ParamMap;
  icon = '';
  DTO_TYPES = DTO_TYPES;
  ROUTE_BY_TYPE = ROUTE_BY_TYPE;

  constructor(private router: Router, private route: ActivatedRoute,
              private service: LibraryService, private progress: NgProgress) {
  }

  filter(): void { this.filtered = this.source.filter(() => true); }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('progressBar');
    this.route.data.subscribe((data) => {
      this.type = data['type'];
      this.method = data['method'];
    });
    this.icon = ICON_BY_TYPE.get(this.type);
    this.params = this.route.snapshot.paramMap;
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
    this.get(this.selected);
  }

  select(item) {
    this.selected = item;
    this.service.select.next({type: this.type, selected: item});
  }

  get(item) {
    if (!this.service) { return; }
    this.progressRef = (this.selected === undefined)
      ? this.progress.ref('progressBar')
      : this.progress.ref('cardBar');
    if (!this.progressRef.isStarted) {
      this.progressRef.start();
    }
    const subscription = this.service.handle('get', this.type, this.method, undefined, this.params).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        this.progressRef.complete();
        this.source = event.body;
        this.selected = item;
        this.filter();
        subscription.unsubscribe();
      }
    });
  }

  getName(item: any): string {
    return NAME_BY_TYPE(this.type, item);
  }
}
