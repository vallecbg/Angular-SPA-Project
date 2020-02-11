import { Component, OnInit } from "@angular/core";
import { IListing } from "../../shared/models/listing.model";
import { IUser } from "../../shared/models/User.model";
import { ListingService } from "src/app/core/services/listing.service";
import { AuthService } from "src/app/core/services/auth.service";
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: "app-edit-listing",
  templateUrl: "./edit-listing.component.html",
  styleUrls: ["./edit-listing.component.css"]
})
export class EditListingComponent implements OnInit {
  editForm: FormGroup;
  listing: IListing;
  listingId: string;
  seller: IUser;

  constructor(
    private listingService: ListingService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.listingId = params["id"];
    });

    this.listingService.getListing(this.listingId).subscribe(data => {
      this.listing = data;
      this.authService.getUser(this.listing.sellerId).subscribe(data => {
        this.seller = data;
        console.log(this.listing);
        console.log(this.seller);

        this.editForm = this.fb.group({
          make: [null, [Validators.required]],
          model: [null, [Validators.required]],
          year: [null, null],
          kilometers: [null, null],
          horsePower: [null, null],
          color: [null, null],
          engineType: [null, null],
          transmission: [null, null],
          images: this.fb.array([this.fb.group({url: ''})]),
          price: [null, [Validators.required]],
          description: [null, null]
        });
      });
    });

    // if (this.listing) {
      
    // }
  }

  get images() {
    return this.editForm.get("images") as FormArray;
  }

  addImage() {
    this.images.push(this.fb.group({ url: "" }));
  }

  deleteImage(index) {
    this.images.removeAt(index);
  }

  editListing() {}
}
