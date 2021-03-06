import { Component, OnInit } from '@angular/core';
import { IListing } from '../../shared/models/listing.model';
import { ListingService } from 'src/app/core/services/listing.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from '../../shared/models/User.model';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from '../../shared/models/toastr.config';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  listing: IListing;
  listingId: string;
  seller: IUser;
  isOwner: boolean;
  defaultImageUrl: string = "https://firebasestorage.googleapis.com/v0/b/ng-carsapp.appspot.com/o/slider%2F1024px-No_image_available.svg.png?alt=media&token=2ee3ae5c-e363-4da5-a9b6-3876c891bc52";
  


  constructor(
    private listingService: ListingService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.listingId = params['id'];
    })

    this.getListing(this.listingId);
  }

  getListing(listingId: string){
    this.listingService.getListing(listingId).subscribe((data) => {
      this.listing = data;
      this.authService.getUser(this.listing.sellerId).subscribe((data) => {
        this.seller = data;
        this.isOwner = this.listingService.isOwner(this.listing.sellerId);
      })
    })
  }

  deleteListing(listingId: string){
    this.listingService.deleteListing(listingId);
  }
}
