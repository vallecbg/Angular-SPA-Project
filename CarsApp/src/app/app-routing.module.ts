import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from './core/guards/auth-guard.guard';

import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Route[] = [
  { path: "", component: HomeComponent },
  { path: "index", component: HomeComponent },
  { path: "login", component: SigninComponent },
  { path: "register", component: SignupComponent },
  {
    path: "listing",
    loadChildren: () => import('./components/listing/listing.module').then(x => x.ListingModule),
    canActivate: [AuthGuard]
  },
  {
    path: "user",
    loadChildren: () => import('./components/user/user.module').then(x => x.UserModule),
    canActivate: [AuthGuard]
  },
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
