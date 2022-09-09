import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LibraryService} from '../../../services/library.service';
import {DTO_TYPES, ICON_BY_TYPE, TYPE_NAME} from '../../../environments/environment';
import {ReturnObject} from '../../../models/return-object';
import {MatStepper} from '@angular/material/stepper';
import {ActiveRouteService} from '../../../services/active-route.service';
import {StepperSelectionEvent} from '@angular/cdk/stepper';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') stepper: MatStepper;

  returnUrl = '/';
  returnType: DTO_TYPES;
  returnObj: any;
  icon = '';
  parents: BehaviorSubject<ReturnObject[]>;
  type: DTO_TYPES;

  constructor(private router: Router, private service: LibraryService, private active: ActivatedRoute, private route: ActiveRouteService) {
    route.data.subscribe(data => this.type = data.type || this.active.snapshot.data.type);
    this.parents = this.service.parents;
  }

  ngOnInit() {
  }

  returnTo(event: StepperSelectionEvent) {
    const stepIndex = event.selectedIndex;
    const currentParents = this.parents.value;
    if (currentParents[stepIndex]) {
      const url = currentParents[stepIndex].url;
      this.parents.next(currentParents.splice(stepIndex));
      this.router.navigate([url]);
    }
  }

  getDtoName(): string {
    return TYPE_NAME.get(this.type);
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

  ngAfterViewInit(): void {
    this.stepper.steps.changes.subscribe(() => {
      this.stepper.steps.last.select();
    });
  }
}
