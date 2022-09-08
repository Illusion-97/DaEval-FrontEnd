import {Component, OnInit} from '@angular/core';
import {LibraryService} from '../../../services/library.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DTO_TYPES, ICON_BY_TYPE, NAME_BY_TYPE, TYPE_NAME} from '../../../environments/environment';
import {HttpEventType} from '@angular/common/http';
import {BehaviorSubject, finalize} from 'rxjs';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {AntiAbuseService} from '../../../services/anti-abuse.service';

@Component({
  selector: 'app-panel-etudiant',
  templateUrl: './panel-etudiant.component.html',
  styleUrls: ['./panel-etudiant.component.css']
})
export class PanelEtudiantComponent implements OnInit {

  progressRef: NgProgressRef;
  filter = {
    etudiantId: null,
    promotionId: null,
    blocCompetencesId: null
  };

  currentType: DTO_TYPES = DTO_TYPES.EVALUATION;

  datas: Map<DTO_TYPES, {total: number, array: any[]}> = new Map([
    [DTO_TYPES.EVALUATION, {total: 0, array: []}],
    [DTO_TYPES.POSITION, {total: 0, array: []}]
  ]);
  promotion: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  pageSize = 10;
  niveaux: any[] = [];
  promotions: any[] = [];
  blocCompetences: any[] = [];
  DTO_TYPES = DTO_TYPES;
  TYPE_NAME = TYPE_NAME;
  ICON_BY_TYPE = ICON_BY_TYPE;
  etudiant: any;


  constructor(private service: LibraryService, private route: ActivatedRoute, private router: Router,
              private progress: NgProgress, private abuseGard: AntiAbuseService) { }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('progressBar');
    this.filter.etudiantId = 2;
    this.service.handle('get', DTO_TYPES.ETUDIANT, 'ById?id=' + this.filter.etudiantId)
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.etudiant = event.body;
          this.service.handle('post', DTO_TYPES.PROMOTION, 'AllById', this.etudiant)
            .subscribe(eventEtu => {
              if (eventEtu.type === HttpEventType.Response) {
                this.promotions = eventEtu.body;
              }
            });
        }
      });
    this.promotion.asObservable().subscribe(promo => {
      if (promo) {
        this.filter.promotionId = promo.id;
        this.filter.blocCompetencesId = null;
        this.search();
        this.service.handle('get', DTO_TYPES.BLOC_COMPETENCES, 'findByTitreProId?titreId=' + promo.titreProfessionnelId)
          .subscribe(eventEtu => {
            if (eventEtu.type === HttpEventType.Response) {
              this.blocCompetences = eventEtu.body;
            }
          });
      }
    });
    this.service.handle('get', DTO_TYPES.NIVEAUX, 'Niveaux')
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.niveaux = event.body;
        }
      });
  }

  blocChange(id: number) {
    if (id) {
      this.filter.blocCompetencesId = id;
      this.search();
    }
  }

  search() {
    this.getCount(DTO_TYPES.EVALUATION);
    this.getCount(DTO_TYPES.POSITION);
  }

  getCount(type: DTO_TYPES) {
    this.service.handle('post', type, 'FilteredCount', this.filter)
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.datas.get(type).total = event.body;
          this.getPage(type, 0);
        }
      });
  }

  getPage(type: DTO_TYPES, page: number) {
    this.service.handle('post', type, 'FilteredByPage', this.filter, undefined, page, this.pageSize)
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.datas.get(type).array = event.body;
        }
      });
  }

  getPromotionIcon(): string {
    return ICON_BY_TYPE.get(DTO_TYPES.PROMOTION);
  }

  getPromotionName(item: any): string {
    return NAME_BY_TYPE(DTO_TYPES.PROMOTION, item);
  }

  getBlocName(item: any): string {
    return NAME_BY_TYPE(DTO_TYPES.BLOC_COMPETENCES, item);
  }

  select(promo: any) {
    this.promotion.next(promo);
  }

  submit(position) {
    this.progressRef.start();
    this.service.handle('post', DTO_TYPES.POSITION, 'Save', position).pipe(finalize(() => this.progressRef.complete())).subscribe();
  }
}
