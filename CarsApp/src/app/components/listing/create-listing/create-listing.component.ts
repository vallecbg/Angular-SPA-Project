import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ListingService } from "src/app/core/services/listing.service";

@Component({
  selector: "app-create-listing",
  templateUrl: "./create-listing.component.html",
  styleUrls: ["./create-listing.component.css"]
})
export class CreateListingComponent implements OnInit, OnDestroy {
  listingForm: FormGroup;
  //expirationDate = new Date();

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.expirationDate.setMonth(this.expirationDate.getMonth() + 3);
    this.listingForm = this.fb.group({
      make: [null, [Validators.required]],
      model: [null, [Validators.required]]
    });
  }

  ngOnDestroy() {
    console.log("create listing form is reset");
    this.listingForm.reset();
  }

  createListing() {
    const { make, model } = this.listingForm.value;

    this.listingService.createListing({ make, model, creationDate: new Date() });
  }
}
