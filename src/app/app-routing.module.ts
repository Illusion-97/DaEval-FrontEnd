import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LibraryComponent} from './page/library/library.component';
import {HomeComponent} from './page/home/home.component';
import {DTO_TYPES} from '../environments/environment';
import {FilterComponent} from './composants/filters/filter/filter.component';


const blocChild: Routes = [
  {path: '', component: FilterComponent}
];
const evalChild: Routes = [
  {path: '', component: FilterComponent}
];
const etudChild: Routes = [
  {path: '', component: FilterComponent},
  {path: ':etudiantId/Evaluations', data: {type: DTO_TYPES.EVALUATION, method: 'findByBlocAndEtudiantAndPromotion'}, children: evalChild},
];
const promoChild: Routes =  [
  {path: ':promoId/Etudiants', data: {type: DTO_TYPES.ETUDIANT, method: 'findByPromotionId'}, children: etudChild},
  {path: '', component: FilterComponent},
];
const titreChild: Routes =  [
  {path: ':titreId/Promotions', data: {type: DTO_TYPES.PROMOTION, method: 'findByTitreAndVille'}, children: promoChild},
  {path: ':titreId/BlocCompetences', data: {type: DTO_TYPES.BLOC_COMPETENCES, method: 'findByTitreProId'}, children: blocChild},
  {path: '', component: FilterComponent},
];
const villeChild: Routes =  [
  {path: ':villeId/Promotions', data: {type: DTO_TYPES.PROMOTION, method: 'findByTitreAndVille'}, children: promoChild},
  {path: ':villeId/Etudiants', data: {type: DTO_TYPES.ETUDIANT, method: 'findByVilleId'}, children: etudChild},
  {path: '', component: FilterComponent, data: {type: DTO_TYPES.VILLE}},
];

const routes: Routes = [
  {path: 'BlocCompetences', component: LibraryComponent, data: {type: DTO_TYPES.BLOC_COMPETENCES, method: 'All'}, children: blocChild},
  {path: 'Etudiants', component: LibraryComponent, data: {type: DTO_TYPES.ETUDIANT, method: 'All'}, children: etudChild},
  {path: 'TitresProfessionnels', component: LibraryComponent, data: {type: DTO_TYPES.TITRE_PRO, method: 'All'}, children: titreChild },
  {path: 'Villes', component: LibraryComponent, data: {type: DTO_TYPES.VILLE, method: 'All'}, children: villeChild},
  {path: 'Promotions', component: LibraryComponent, data: {type: DTO_TYPES.PROMOTION, method: 'All'}, children: promoChild},
  {path: 'Evaluations', component: LibraryComponent, data: {type: DTO_TYPES.EVALUATION, method: 'All'}, children: evalChild},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
