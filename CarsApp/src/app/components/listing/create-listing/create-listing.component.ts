import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ListingService } from "src/app/core/services/listing.service";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-create-listing",
  templateUrl: "./create-listing.component.html",
  styleUrls: ["./create-listing.component.css"]
})
export class CreateListingComponent implements OnInit, OnDestroy {
  listingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.listingForm = this.fb.group({
      make: [null, [Validators.required]],
      model: [null, [Validators.required]],
      year: [null, null],
      kilometers: [null, null],
      horsePower: [null, null],
      color: [null, null],
      engineType: [null, null],
      transmission: [null, null],
      imageUrl: [null, null],
      price: [null, [Validators.required]],
      description: [null, null]
    });
  }

  ngOnDestroy() {
    console.log("create listing form is sent");
    this.listingForm.reset();
  }

  createListing() {
    const {
      make,
      model,
      year,
      kilometers,
      horsePower,
      color,
      engineType,
      transmission,
      imageUrl,
      price,
      description
    } = this.listingForm.value;

    const sellerId = this.authService.getUserId();
    const creationDate = new Date();

    this.listingService.createListing({
      make,
      model,
      year,
      kilometers,
      horsePower,
      color,
      engineType,
      transmission,
      imageUrl,
      price,
      description,
      sellerId,
      creationDate
    });
  }
}
