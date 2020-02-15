import { Component, OnInit } from '@angular/core';
import { ListingService } from 'src/app/core/services/listing.service';
import { IListing } from '../../shared/models/listing.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listing-all',
  templateUrl: './listing-all.component.html',
  styleUrls: ['./listing-all.component.css']
})
export class ListingAllComponent implements OnInit {

  listings: Observable<IListing[]>;
  defaultImageUrl: string = "https://firebasestorage.googleapis.com/v0/b/ng-carsapp.appspot.com/o/slider%2F1024px-No_image_available.svg.png?alt=media&token=2ee3ae5c-e363-4da5-a9b6-3876c891bc52";

  constructor(
    private listingService: ListingService
  ) { }

  ngOnInit() {
    this.listings = this.listingService.getAllListings();
  }

}
