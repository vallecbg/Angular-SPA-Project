import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  imageUrlArray = [
    "https://static10.gaadicdn.com/home_slider/Ford-Banner-2.jpg",
    "https://static10.gaadicdn.com/home_slider/Ford-Banner-1.jpg",
    "https://buyyourproduct.com/wp-content/uploads/Used-Car-For-Sale-A-Guide-to-Selling-Your-Car-2.jpg",
    "https://firebasestorage.googleapis.com/v0/b/ng-carsapp.appspot.com/o/slider%2Fcar-banner.jpg?alt=media&token=e4cd4c98-d47e-4c06-ae7f-fa8586c3d0fe",
    "https://firebasestorage.googleapis.com/v0/b/ng-carsapp.appspot.com/o/slider%2Funnamed.jpg?alt=media&token=927cb907-4149-4875-9a93-98d9dcaa31cd"];
  
  isAuth: boolean = false;
  isAuthSub: Subscription;
  constructor(
    private authService: AuthService
  ) { }

  get isAuthFromService(){
    return this.authService.isAuth();
  }

  ngOnInit() {
    this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
    });
    this.isAuth = this.isAuthFromService;
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }

}
