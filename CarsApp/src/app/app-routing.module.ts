import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from './core/guards/auth-guard.guard';

import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { HomeComponent } from "./components/home/home.component";
import { CreateListingComponent } from "./components/listing/create-listing/create-listing.component";
import { ListingDetailsComponent } from './components/listing/listing-details/listing-details.component';

const routes: Route[] = [
  { path: "", component: HomeComponent },
  { path: "index", component: HomeComponent },
  { path: "login", component: SigninComponent },
  { path: "register", component: SignupComponent },
  {
    path: "listing", children: [
      { path: "create", component: CreateListingComponent },
      { path: "details/:id", component: ListingDetailsComponent }
    ], 
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
