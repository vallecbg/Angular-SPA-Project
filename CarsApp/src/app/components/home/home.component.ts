import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  isAuthSub: Subscription;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
    });
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }

}
