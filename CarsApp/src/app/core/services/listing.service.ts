import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { IListing } from 'src/app/components/shared/models/listing.model';
import { CreateListingModel } from 'src/app/components/shared/models/create-listing.model';
import { Observable, of } from 'rxjs';
import {map, catchError} from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from 'src/app/components/shared/models/toastr.config';

@Injectable({
    providedIn: "root"
})
export class ListingService {
    //listings: IListing[];

    constructor(
        private afDb: AngularFirestore, 
        private router: Router,
        private toastr: ToastrService
    ){}

    createListing(payload: CreateListingModel) {
        //TODO: think about duplicate entities
        this.afDb.collection<CreateListingModel>("listings").add(payload)
            .then((data) => {
                this.toastr.success("Successfully created listing!", "Success", ToastrConfig);
                this.router.navigate(["/"]);
            })
            .catch((err) => {
                this.toastr.error(err, "Error", ToastrConfig);
            })
    }

    getListing(id: string): Observable<IListing> {
        const listingDocuments = this.afDb.doc<IListing>('listings/' + id);
        return listingDocuments.snapshotChanges()
          .pipe(
            map(changes => {
              const data = changes.payload.data();
              const id = changes.payload.id;
              if(!data){
                this.toastr.error("The listing is not found!", "Error", ToastrConfig);
                this.router.navigate(['/']);
              }
              return {id, ...data};
            }))
      }
}
