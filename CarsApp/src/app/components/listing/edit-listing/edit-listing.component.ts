import { Component, OnInit, OnDestroy } from "@angular/core";
import { IListing } from "../../shared/models/listing.model";
import { IUser } from "../../shared/models/User.model";
import { ListingService } from "src/app/core/services/listing.service";
import { AuthService } from "src/app/core/services/auth.service";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-edit-listing",
  templateUrl: "./edit-listing.component.html",
  styleUrls: ['../../shared/styles/create-form.css']
})
export class EditListingComponent implements OnInit, OnDestroy {
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
    this.editForm = this.fb.group({
      make: [null, [Validators.required]],
      model: [null, [Validators.required]],
      year: [null, [Validators.required, Validators.min(1900), Validators.max(2020)]],
      kilometers: [null, Validators.required],
      horsePower: [null, Validators.required],
      color: [null, null],
      engineType: [null, Validators.required],
      transmission: [null, null],
      images: this.fb.array([this.fb.group({url: ''})]),
      price: [null, [Validators.required]],
      description: [null, null]
    });


    this.route.params.subscribe((params: Params) => {
      this.listingId = params["id"];
    });

    this.setForm();
  }

  setForm() {
    this.listingService.getListing(this.listingId).subscribe(data => {
      this.listing = data;
      this.authService.getUser(this.listing.sellerId).subscribe(data => {
        this.seller = data;

        if(this.listing.images){
          this.editForm = this.fb.group({
            make: [this.listing.make, [Validators.required]],
            model: [this.listing.model, [Validators.required]],
            year: [this.listing.year, [Validators.required, Validators.min(1900), Validators.max(2020)]],
            kilometers: [this.listing.kilometers, Validators.required],
            horsePower: [this.listing.horsePower, Validators.required],
            color: [this.listing.color, null],
            engineType: [this.listing.engineType, Validators.required],
            transmission: [this.listing.transmission, null],
            images: this.fb.array(this.listing.images.map(img => this.createImage(img))),
            price: [this.listing.price, [Validators.required]],
            description: [this.listing.description, null]
          });
        }
      });
    });
  }

  ngOnDestroy() {
    this.editForm.reset();
  }

  private createImage(img) : FormGroup {
    return this.fb.group({
      url: [img.url]
    });
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

  editListing() {
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
    } = this.editForm.value;
    
    const id = this.listingId;
    const updateDate = new Date();

    this.listingService.editListing({
      id,
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
      updateDate
    })
  }
}
