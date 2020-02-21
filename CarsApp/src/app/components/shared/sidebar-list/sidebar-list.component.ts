import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  isAuth: boolean;
  userId: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
      this.getUserId();
    })
  }

  getUserId(){
    this.userId = this.authService.getUserId();
  }

  logout(){
    this.authService.logout();
  }

}
