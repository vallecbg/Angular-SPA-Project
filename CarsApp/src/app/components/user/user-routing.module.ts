import { RouterModule, Route } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Route[] = [
    { path: "details/:id", component: UserDetailsComponent },
    { path: "edit/:id", component: UserEditComponent },
];

export const UserRoutingModule = RouterModule.forChild(routes);