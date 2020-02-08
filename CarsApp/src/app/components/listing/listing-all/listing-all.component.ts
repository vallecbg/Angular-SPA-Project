import { Component, OnInit } from '@angular/core';
import { ListingService } from 'src/app/core/services/listing.service';
import { IListing } from '../../shared/models/listing.model';

@Component({
  selector: 'app-listing-all',
  templateUrl: './listing-all.component.html',
  styleUrls: ['./listing-all.component.css']
})
export class ListingAllComponent implements OnInit {

  listings: IListing[];

  constructor(
    private listingService: ListingService,

  ) { }

  ngOnInit() {

    this.listingService.getAllListings().subscribe((data) => {
      this.listings = data;
      console.log(this.listings);
    })
  }

}
