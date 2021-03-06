import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() onToggleSidenav = new EventEmitter<void>();
  isAuth: boolean;
  userId: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
      this.getUserId();
    })
  }

  getUserId(){
    this.userId = this.authService.getUserId();
  }

  toggleSidenav(){
    this.onToggleSidenav.emit();
  }

  logout(){
    this.authService.logout();
  }
}
