import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IListing } from '../../shared/models/listing.model';
import { ListingService } from 'src/app/core/services/listing.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-listings',
  templateUrl: './user-listings.component.html',
  styleUrls: ['./user-listings.component.css']
})
export class UserListingsComponent implements OnInit {

  listings: IListing[];
  userId: string;
  defaultImageUrl: string = "https://firebasestorage.googleapis.com/v0/b/ng-carsapp.appspot.com/o/slider%2F1024px-No_image_available.svg.png?alt=media&token=2ee3ae5c-e363-4da5-a9b6-3876c891bc52";

  constructor(
    private listingService: ListingService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.listingService.getUserListings(this.userId).subscribe(data => {
      this.listings = data;
      console.log(this.listings);
    })
  }

}
