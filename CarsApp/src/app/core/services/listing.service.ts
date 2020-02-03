import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { IListing } from 'src/app/components/shared/models/listing.model';
import { CreateListingModel } from 'src/app/components/shared/models/create-listing.model';

@Injectable({
    providedIn: "root"
})
export class ListingService {
    //listings: IListing[];

    constructor(
        private afDb: AngularFirestore, 
        private router: Router
    ){}

    createListing(payload: CreateListingModel) {
        //TODO: think about duplicate entities
        this.afDb.collection<CreateListingModel>("listings").add(payload)
            .then((data) => {
                this.router.navigate(["/"]);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
