import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ListingService } from "src/app/core/services/listing.service";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-create-listing",
  templateUrl: "./create-listing.component.html",
  styleUrls: ['../../shared/styles/create-form.css']
})
export class CreateListingComponent implements OnInit, OnDestroy {
  listingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.listingForm = this.fb.group({
      make: [null, [Validators.required]],
      model: [null, [Validators.required]],
      year: [null, Validators.required],
      kilometers: [null, Validators.required],
      horsePower: [null, Validators.required],
      color: [null, null],
      engineType: [null, Validators.required],
      transmission: [null, null],
      images: this.fb.array([this.fb.group({url: ''})]),
      price: [null, [Validators.required]],
      description: [null, null]
    });
  }

  get images(){
    return this.listingForm.get('images') as FormArray;
  }

  addImage(){
    this.images.push(this.fb.group({url: ''}));
  }

  deleteImage(index){
    this.images.removeAt(index);
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
      images,
      price,
      description
    } = this.listingForm.value;

    if(images.length === 0) {
      images.push({url: ''});
    }

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
      images,
      price,
      description,
      sellerId,
      creationDate
    });
  }
}
