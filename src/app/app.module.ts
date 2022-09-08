import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CardComponent} from './composants/card/card.component';
import {LibraryComponent} from './page/library/library.component';
import {TitleListComponent} from './composants/title-list/title-list.component';
import {HeaderComponent} from './composants/header/header.component';
import {FooterComponent} from './composants/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditorOldComponent} from './composants/editor/editorOld.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {HttpClientModule} from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {NgProgressModule} from 'ngx-progressbar';
import {FilterVilleComponent} from './composants/filters/filter-ville/filter-ville.component';
import {FilterTitreComponent} from './composants/filters/filter-titre/filter-titre.component';
import {HomeComponent} from './page/home/home.component';
import {FilterComponent} from './composants/filters/filter/filter.component';
import {BlocCompComponent} from './composants/forms/bloc-comp/bloc-comp.component';
import {EditorComponent} from './composants/forms/editor/editor.component';
import {CompetenceComponent} from './composants/forms/competence/competence.component';
import {PromotionComponent} from './composants/forms/promotion/promotion.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';
import {MatSelectModule} from '@angular/material/select';
import {InscriptionComponent} from './page/inscription/inscription.component';
import {PanelEtudiantComponent} from './page/panel-etudiant/panel-etudiant.component';
import {PaginateComponent} from './composants/paginate/paginate.component';
import {FramedComponent} from './page/framed/framed.component';
import {SafePipe} from './composants/pipe/safe-pipe.pipe';
import { LoginComponent } from './page/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    LibraryComponent,
    TitleListComponent,
    HeaderComponent,
    FooterComponent,
    EditorOldComponent,
    EditorComponent,
    FilterComponent,
    FilterVilleComponent,
    FilterTitreComponent,
    HomeComponent,
    BlocCompComponent,
    CompetenceComponent,
    PromotionComponent,
    InscriptionComponent,
    PanelEtudiantComponent,
    PaginateComponent,
    FramedComponent,
    SafePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSelectInfiniteScrollModule,
    NgProgressModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
