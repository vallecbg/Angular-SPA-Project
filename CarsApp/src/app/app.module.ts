import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppComponent } from "./app.component";
import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { ToolbarComponent } from "./components/shared/toolbar/toolbar.component";
import { SidebarListComponent } from "./components/shared/sidebar-list/sidebar-list.component";
import { CreateListingComponent } from "./components/listing/create-listing/create-listing.component";

import { environment } from "src/environments/environment";
import { ListingDetailsComponent } from './components/listing/listing-details/listing-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    HomeComponent,
    ToolbarComponent,
    SidebarListComponent,
    CreateListingComponent,
    ListingDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({timeOut: 3000, preventDuplicates: true}),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  //TODO: check
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent],
  //TODO: check if needed
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
