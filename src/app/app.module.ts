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
import {EditorComponent} from './composants/editor/editor.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    LibraryComponent,
    TitleListComponent,
    HeaderComponent,
    FooterComponent,
    EditorComponent
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
    NgProgressModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
