import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DomNavComponent } from './dom-nav/dom-nav.component';
import { MainGridComponent } from './main-grid/main-grid.component';

import { MatSidenavModule }  from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FileDialogComponent } from './file-dialog/file-dialog.component';
import { CoreComponent } from './core/core.component';

import { FileIOService } from './services/file-io.service';
import { CoreService } from './services/core.service';

@NgModule({
  declarations: [
    AppComponent,
    DomNavComponent,
    MainGridComponent,
    FileDialogComponent,
    CoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [
    CoreService,
    FileIOService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
