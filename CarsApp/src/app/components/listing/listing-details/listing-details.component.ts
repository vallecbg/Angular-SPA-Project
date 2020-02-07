import { Component, OnInit } from '@angular/core';
import { IListing } from '../../shared/models/listing.model';
import { ListingService } from 'src/app/core/services/listing.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  listing: IListing;
  listingId: string;
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);


  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute,
    private config: NgbCarouselConfig
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.listingId = params['id'];
    })

    this.listingService.getListing(this.listingId).subscribe((data) => {
      this.listing = data;
      this.setupCarousel();
      console.log(this.listing);
    })
  }

  setupCarousel(){
    this.config.interval = 5000;
    this.config.pauseOnHover = false; 
  }
}
