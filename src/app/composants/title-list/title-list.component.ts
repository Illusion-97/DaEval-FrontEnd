import {Component, OnInit} from '@angular/core';
import {DTO_TYPES, ICON_BY_TYPE, NAME_BY_TYPE} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {LibraryService} from '../../../services/library.service';

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.css']
})
export class TitleListComponent implements OnInit {
  returnUrl: string;
  returnType: DTO_TYPES;
  returnObj: any;
  icon = '';

  constructor(private router: Router, private service: LibraryService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscribe();
  }

  returnTo() {
    this.service.select.next({type: this.returnType, selected: this.returnObj});
    this.router.navigate([this.returnUrl])
      .then(() => {
        this.returnObj = undefined;
        this.subscribe();
      });
  }

  getName(item: any): string {
    return NAME_BY_TYPE(this.returnType, item);
  }

  subscribe() {
    const s = this.service.navigate.subscribe(parent => {
      if (parent) {
        this.returnType = parent.type;
        this.icon = ICON_BY_TYPE.get(this.returnType);
        this.returnObj = parent.selected;
        this.returnUrl = this.router.routerState.snapshot.url;
        s.unsubscribe();
      }
    });
  }
}
