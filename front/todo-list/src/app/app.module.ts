import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule  } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { DeleteModalComponent } from './song-modal/delete-modal.component';
// import { UpdateModalComponent } from './song-modal/update-modal.component';
import { AddModalComponent } from './todo-modal/add-modal.component';
import { DoneModalComponent } from './todo-modal/done-modal.component';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    // DeleteModalComponent,
    // UpdateModalComponent,
    AddModalComponent,
    DoneModalComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatTableModule,
    MatSortModule,
    NgbModule,
    // NgxSliderModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
