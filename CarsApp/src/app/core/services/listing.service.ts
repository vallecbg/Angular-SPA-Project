import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { IListing } from "src/app/components/shared/models/listing.model";
import { CreateListingModel } from "src/app/components/shared/models/create-listing.model";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { ToastrConfig } from "src/app/components/shared/models/toastr.config";
import { ListingEditModel } from 'src/app/components/shared/models/listing-edit.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class ListingService {
  constructor(
    private afDb: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  isOwner(sellerId: string) : boolean{
    return sellerId === this.authService.getUserId();
  }

  createListing(payload: CreateListingModel) {
    this.afDb
      .collection<CreateListingModel>("listings")
      .add(payload)
      .then(data => {
        this.toastr.success(
          "Successfully created listing!",
          "Success",
          ToastrConfig
        );
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.toastr.error(err, "Error", ToastrConfig);
      });
  }

  getListing(id: string): Observable<IListing> {
    const listingDocuments = this.afDb.doc<IListing>("listings/" + id);
    return listingDocuments.snapshotChanges().pipe(
      map(changes => {
        const data = changes.payload.data();
        if (!data) {
          this.toastr.error("The listing is not found!", "Error", ToastrConfig);
          this.router.navigate(["/"]);
        }
        return { id, ...data };
      })
    );
  }

  getAllListings(){
    const listingDocuments = this.afDb.collection<IListing>("listings").snapshotChanges();
    return listingDocuments.pipe(
      map(actions => actions.map(
        a => {
          const data = a.payload.doc.data() as IListing;
          const id = a.payload.doc.id;
          return {id, ...data};
        }))
    );
  }

  editListing(listing: ListingEditModel){
    this.afDb.doc("listings/" + listing.id).update(listing)
    .then(data => {
      this.toastr.success(
        "Successfully edited listing!",
        "Success",
        ToastrConfig
      );
      this.router.navigate(["/"]);
    })
    .catch(err => {
      this.toastr.error(err, "Error", ToastrConfig);
    });
  }

  deleteListing(listingId: string){
    this.afDb.doc("listings/" + listingId).delete()
    .then(data => {
      this.toastr.success(
        "Successfully deleted listing!",
        "Success",
        ToastrConfig
      );
      this.router.navigate(["/"]);
    })
    .catch(err => {
      this.toastr.error(err, "Error", ToastrConfig);
    });
  }
}
