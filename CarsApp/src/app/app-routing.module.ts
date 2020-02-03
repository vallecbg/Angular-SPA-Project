import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { HomeComponent } from './components/home/home.component';
import { CreateListingComponent } from './components/listing/create-listing/create-listing.component';

const routes: Route[] = [
  { path:"", component: HomeComponent },
  {
    path: "auth",
    children: [
      { path: "signin", component: SigninComponent },
      { path: "signup", component: SignupComponent }
    ]
  },
  {
    path: "listing",
    children: [
      { path: "create-listing", component: CreateListingComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
