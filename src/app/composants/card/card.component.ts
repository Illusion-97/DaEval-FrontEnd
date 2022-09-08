import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LibraryService} from '../../../services/library.service';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {
  CHILD_TYPES_BY_TYPE,
  DTO_TYPES,
  FORM_BY_TYPE,
  ICON_BY_TYPE,
  NAME_BY_TYPE,
  ROUTE_BY_TYPE,
  TYPE_NAME
} from '../../../environments/environment';
import {finalize, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {EditorComponent} from '../forms/editor/editor.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  selected: any = undefined;
  selectSubscription: Subscription;
  type: DTO_TYPES = undefined;
  progressRef: NgProgressRef;
  icon = '';
  DTO_TYPES = DTO_TYPES;
  CHILD_TYPES_BY_TYPE = CHILD_TYPES_BY_TYPE;
  ROUTE_BY_TYPE = ROUTE_BY_TYPE;
  TYPE_NAME = TYPE_NAME;
  FORM_BY_TYPE = FORM_BY_TYPE;

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog,
              private service: LibraryService, private progress: NgProgress,
              /*private abuseGard: AntiAbuseService*/) {
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('cardBar');
    this.icon = ICON_BY_TYPE.get(this.type);
    this.selectSubscription = this.service.select.subscribe(
      select => {
        if (select) {
          this.selected = select.selected;
          this.type = select.type;
        }
      });
  }

  navigate(destType: DTO_TYPES) {
    this.service.navigate.emit({type: this.type, selected: this.selected});
    this.router.navigate([this.router.routerState.snapshot.url + '/' + this.selected.id + ROUTE_BY_TYPE.get(destType)])
      .then(() => {
        this.selected = undefined;
        this.type = undefined;
      })
      .catch(reason => console.log(reason));
  }

  openDialog(create: boolean): void {
    this.dialog.open(EditorComponent, {data: {selected: (create) ? undefined : this.selected, type: this.type}})
      .afterClosed().subscribe(data => {
      if (data.submited && data.result) {
        this.progressRef.start();
        this.service.handle(create ? 'post' : 'put', this.type, 'Save', data.result)
          .pipe(finalize(() => this.progressRef.complete())).subscribe();
      }
    });
  }

  getName(item: any): string {
    return NAME_BY_TYPE(this.type, item);
  }

  getIcon(): string {
    return ICON_BY_TYPE.get(this.type);
  }

  isEditable(type: DTO_TYPES) {
    return FORM_BY_TYPE.get(type).editable;
  }
}

function structuredClone(selected) {
  throw new Error('Function not implemented.');
}


