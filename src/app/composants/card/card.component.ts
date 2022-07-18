import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Select} from '../../../models/Select';
import {EditorComponent} from '../editor/editor.component';
import {MatDialog} from '@angular/material/dialog';
import {LibraryService} from '../../../services/library.service';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {AntiAbuseService} from '../../../services/anti-abuse.service';
import {CHILD_TYPES_BY_TYPE, DTO_TYPES, ICON_BY_TYPE, NAME_BY_TYPE, ROUTE_BY_TYPE, TYPE_NAME} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

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

  update() {
    const copy = {...this.selected};
    this.progressRef.start();
   /* this.service.save(copy).subscribe(jeu => {
      this.service.update.emit(jeu);
      this.abuseGard.setFree(jeu.id);
    });*/
  }

  navigate(destType: DTO_TYPES) {
    this.service.navigate.emit({type: this.type, selected: this.selected});
    this.router.navigate([this.router.routerState.snapshot.url + '/' + this.selected.id + ROUTE_BY_TYPE.get(destType)]);
  }

  openDialog(): void {
    this.dialog.open(EditorComponent, {data: this.selected});
  }

  getName(item: any): string {
    return NAME_BY_TYPE(this.type, item);
  }
}

function structuredClone(selected) {
  throw new Error('Function not implemented.');
}


