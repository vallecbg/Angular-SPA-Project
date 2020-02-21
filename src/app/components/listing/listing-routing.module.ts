import { RouterModule, Route } from '@angular/router';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';

const routes: Route[] = [
    { path: "create", component: CreateListingComponent },
    { path: "details/:id", component: ListingDetailsComponent },
    { path: "edit/:id", component: EditListingComponent }
];

export const ListingRoutingModule = RouterModule.forChild(routes);