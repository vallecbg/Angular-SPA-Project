import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material.module";
import { BootstrapModule } from "./bootstrap.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";

import { environment } from "src/environments/environment";

import { ListingModule } from "./components/listing/listing.module"
import { AuthModule } from './components/auth/auth.module';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ToastrModule.forRoot({ timeOut: 3000, preventDuplicates: true }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BootstrapModule,
    ListingModule,
    AuthModule,
    SharedModule
  ],
  //TODO: check
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent],
  //TODO: check if needed
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
