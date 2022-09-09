import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LibraryComponent} from './page/library/library.component';
import {HeaderComponent} from './composants/header/header.component';
import {FooterComponent} from './composants/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {FilterComponent} from './composants/filters/filter/filter.component';
import {EditorComponent} from './composants/forms/editor/editor.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';
import {MatSelectModule} from '@angular/material/select';
import {InscriptionComponent} from './page/inscription/inscription.component';
import {PanelEtudiantComponent} from './page/panel-etudiant/panel-etudiant.component';
import {PaginateComponent} from './composants/paginate/paginate.component';
import {FramedComponent} from './page/framed/framed.component';
import {SafePipe} from './composants/pipe/safe-pipe.pipe';
import {LoginComponent} from './page/login/login.component';
import {MatErrorsComponent} from './composants/mat-errors/mat-errors.component';
import {ListItemsComponent} from './composants/list-items/list-items.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MenuComponent} from './composants/menu/menu.component';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    HeaderComponent,
    FooterComponent,
    EditorComponent,
    FilterComponent,
    InscriptionComponent,
    PanelEtudiantComponent,
    PaginateComponent,
    FramedComponent,
    SafePipe,
    LoginComponent,
    MatErrorsComponent,
    ListItemsComponent,
    MenuComponent,
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
    MatStepperModule
  ],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {displayDefaultIndicatorType: false}
  }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
