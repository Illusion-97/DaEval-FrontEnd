import {Component, OnInit} from '@angular/core';
import {LibraryService} from '../../../services/library.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DTO_TYPES, ICON_BY_TYPE, NAME_BY_TYPE, ROUTE_BY_TYPE} from '../../../environments/environment';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  filter = {
    nom: '',
    prenom: '',
    active: true
  };
  promotion: any;
  totalUsers = 0;
  users: any[];
  inscrits: any[] = [];
  page = 0;

  constructor(private service: LibraryService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const promoId = this.route.snapshot.paramMap.get('id');
    this.service.handle('get', DTO_TYPES.PROMOTION, 'ById?id=' + promoId)
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.promotion = event.body;
          const etuFilter = {
            promotionId: promoId
          };
          this.service.handle('post', DTO_TYPES.ETUDIANT, 'FilteredSimpleUser', etuFilter)
            .subscribe(eventEtu => {
              if (eventEtu.type === HttpEventType.Response) {
                this.inscrits = eventEtu.body;
                this.search();
              }
            });
        }
      });
  }

  search() {
    this.service.handle('post', DTO_TYPES.UTILISATEURS, 'FilteredCount', this.filter)
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.totalUsers = event.body;
          this.getPageUser(0);
        }
      });
  }

  getPageUser(page: number) {
    this.service.handle('post', DTO_TYPES.UTILISATEURS, 'FilteredByPage', this.filter, undefined, page, 5)
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.users = event.body;
          this.page = page;
        }
      });
  }

  getPromotionName(): string {
    return NAME_BY_TYPE(DTO_TYPES.PROMOTION, this.promotion);
  }

  getPromotionIcon(): string {
    return ICON_BY_TYPE.get(DTO_TYPES.PROMOTION);
  }

  getUserName(item: any): string {
    return NAME_BY_TYPE(DTO_TYPES.UTILISATEURS, item);
  }

  add(user: any) {
    this.inscrits.push(user);
  }

  remove(user: any) {
    this.inscrits = this.inscrits.filter(inscrit => inscrit.id !== user.id);
  }

  canAdd(id: number): boolean {
    return !this.inscrits.map(i => i.id).includes(id);
  }

  maxPage(): number {
    return Math.ceil(this.totalUsers / 5);
  }

  submit() {
    this.service.handle('post', DTO_TYPES.ETUDIANT, 'inscription', {
      promotionId: this.promotion.id,
      utilisateursId: this.inscrits.map(i => i.id)
    })
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          const commands = [`/${ROUTE_BY_TYPE.get(DTO_TYPES.PROMOTION)}/${this.promotion.id}/${ROUTE_BY_TYPE.get(DTO_TYPES.ETUDIANT)}`];
          this.router.navigate(commands).then();
        }
      });
  }
}
