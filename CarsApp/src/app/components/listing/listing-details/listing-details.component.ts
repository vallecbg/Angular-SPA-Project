import { Component, OnInit } from '@angular/core';
import { IListing } from '../../shared/models/listing.model';
import { ListingService } from 'src/app/core/services/listing.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from '../../shared/models/User.model';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  listing: IListing;
  listingId: string;
  seller: IUser;
  // images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  


  constructor(
    private listingService: ListingService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private config: NgbCarouselConfig
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.listingId = params['id'];
    })

    this.listingService.getListing(this.listingId).subscribe((data) => {
      this.listing = data;
      console.log(this.listing);
      this.authService.getUser(this.listing.sellerId).subscribe((data) => {
        this.seller = data;
        console.log(this.seller);
      })
    })

    
  }
}
