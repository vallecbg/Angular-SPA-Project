import { Component, OnInit } from '@angular/core';
import { IListing } from '../../shared/models/listing.model';
import { ListingService } from 'src/app/core/services/listing.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrConfig } from '../../shared/models/toastr.config';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  listing: IListing;
  listingId: string;

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.listingId = params['id'];
    })

    this.listingService.getListing(this.listingId).subscribe((data) => {
      this.listing = data;
      console.log(this.listing);
    })
  }
}
