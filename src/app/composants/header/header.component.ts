import {Component, OnInit} from '@angular/core';
import {DTO_TYPES, ROUTE_BY_TYPE} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  title = 'DaEval';
  anim = true;
  canevas: HTMLElement = undefined;
  DTO_TYPES = DTO_TYPES;
  ROUTE_BY_TYPE = ROUTE_BY_TYPE;

  constructor(private router: Router, private service: AuthenticationService) {
  }

  ngOnInit() {
    this.canevas = document.querySelector('.c');
    this.service.currentUser.subscribe(value => this.user = value);
  }

  handleCanevas() {
    if (this.canevas) {
      this.anim = !this.anim;
      (this.anim) ? this.canevas.removeAttribute('stopped') : this.canevas.setAttribute('stopped', 'true');
    }
  }

  logout() {
    this.service.logout();
  }
}


