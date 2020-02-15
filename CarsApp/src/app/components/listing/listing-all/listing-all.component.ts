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

  constructor(
    private listingService: ListingService
  ) { }

  ngOnInit() {
    // this.listingService.getAllListings().subscribe((data) => {
    //   this.listings = data;
    //   console.log(this.listings);
    // })
    this.listings = this.listingService.getAllListings();
  }

}
