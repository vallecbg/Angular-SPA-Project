import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/User.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: IUser;
  userId: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    })

    this.getUserInfo(this.userId);
  }

  getUserInfo(userId: string){
    this.authService.getUser(userId).subscribe((data) => {
      this.user = data;
    })
  }

}
