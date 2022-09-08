import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LibraryComponent} from './page/library/library.component';
import {HomeComponent} from './page/home/home.component';
import {DTO_TYPES} from '../environments/environment';
import {FilterComponent} from './composants/filters/filter/filter.component';
import {InscriptionComponent} from './page/inscription/inscription.component';
import {PanelEtudiantComponent} from './page/panel-etudiant/panel-etudiant.component';
import {FramedComponent} from './page/framed/framed.component';


const utilChild: Routes = [
  {path: '', component: FilterComponent}
];

const evalChild: Routes = [
  {path: '', component: FilterComponent}
];
const epreChild: Routes = [
  {path: '', component: FilterComponent}
];
const compChild: Routes = [
  {path: '', component: FilterComponent}
];
const blocChild: Routes = [
  {path: '', component: FilterComponent},
  {path: ':blocCompetenceId/Competences', data: {type: DTO_TYPES.COMPETENCE, method: 'FilteredByPage'}, children: compChild},
  {path: ':blocCompetenceId/Epreuves', data: {type: DTO_TYPES.EPREUVE, method: 'FilteredByPage'}, children: compChild},
];
const etudChild: Routes = [
  {path: '', component: FilterComponent},
  {path: ':etudiantId/Evaluations', data: {type: DTO_TYPES.EVALUATION, method: 'FilteredByPage'}, children: evalChild},
];
const promoChild: Routes =  [
  {path: ':promotionId/Etudiants', data: {type: DTO_TYPES.ETUDIANT, method: 'FilteredByPage'}, children: etudChild},
  {path: '', component: FilterComponent},
];
const titreChild: Routes =  [
  {path: ':titreProfessionnelId/Promotions', data: {type: DTO_TYPES.PROMOTION, method: 'FilteredByPage'}, children: promoChild},
  {path: ':titreProfessionnelId/BlocCompetences', data: {type: DTO_TYPES.BLOC_COMPETENCES, method: 'FilteredByPage'}, children: blocChild},
  {path: '', component: FilterComponent},
];
const villeChild: Routes =  [
  {path: ':villeId/Promotions', data: {type: DTO_TYPES.PROMOTION, method: 'FilteredByPage'}, children: promoChild},
  {path: ':villeId/Etudiants', data: {type: DTO_TYPES.ETUDIANT, method: 'FilteredByPage'}, children: etudChild},
  {path: '', component: FilterComponent, data: {type: DTO_TYPES.VILLE}},
];

const routes: Routes = [
  {path: 'BlocCompetences', component: LibraryComponent, data: {type: DTO_TYPES.BLOC_COMPETENCES, method: 'All'}, children: blocChild},
  {path: 'Etudiants', component: LibraryComponent, data: {type: DTO_TYPES.ETUDIANT, method: 'All'}, children: etudChild},
  {path: 'TitresProfessionnels', component: LibraryComponent, data: {type: DTO_TYPES.TITRE_PRO, method: 'All'}, children: titreChild },
  {path: 'Villes', component: LibraryComponent, data: {type: DTO_TYPES.VILLE, method: 'All'}, children: villeChild},
  {path: 'Promotions', component: LibraryComponent, data: {type: DTO_TYPES.PROMOTION, method: 'All'}, children: promoChild},
  {path: 'Promotions/:id/Inscriptions', component: InscriptionComponent},
  {path: 'Evaluations', component: LibraryComponent, data: {type: DTO_TYPES.EVALUATION, method: 'All'}, children: evalChild},
  {path: 'Epreuves', component: LibraryComponent, data: {type: DTO_TYPES.EPREUVE, method: 'All'}, children: epreChild},
  {path: 'Competences', component: LibraryComponent, data: {type: DTO_TYPES.COMPETENCE, method: 'All'}, children: compChild},
  {path: 'Utilisateurs', component: LibraryComponent, data: {type: DTO_TYPES.UTILISATEURS, method: 'All'}, children: utilChild},
  {path: 'Panel', component: PanelEtudiantComponent},
  {path: 'Panel/:obj/:uId/:pId', component: FramedComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
