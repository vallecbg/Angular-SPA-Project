import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from './core/guards/auth-guard.guard';

import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { HomeComponent } from "./components/home/home.component";
import { CreateListingComponent } from "./components/listing/create-listing/create-listing.component";
import { ListingDetailsComponent } from './components/listing/listing-details/listing-details.component';
import { EditListingComponent } from './components/listing/edit-listing/edit-listing.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

const routes: Route[] = [
  { path: "", component: HomeComponent },
  { path: "index", component: HomeComponent },
  { path: "login", component: SigninComponent },
  { path: "register", component: SignupComponent },
  {
    path: "listing", children: [
      { path: "create", component: CreateListingComponent },
      { path: "details/:id", component: ListingDetailsComponent },
      { path: "edit/:id", component: EditListingComponent }
    ], 
    //canActivate: [AuthGuard]
  },
  {
    path: "user", children: [
      { path: "details/:id", component: UserDetailsComponent },
      { path: "edit/:id", component: UserEditComponent },
    ], 
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
