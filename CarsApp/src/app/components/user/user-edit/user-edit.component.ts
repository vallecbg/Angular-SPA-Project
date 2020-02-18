import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../../shared/models/User.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['../../shared/styles/create-form.css']
})
export class UserEditComponent implements OnInit {

  editForm: FormGroup;
  userId: string;
  user: IUser;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.minLength(6)]]
    });

    this.route.params.subscribe((params: Params) => {
      this.userId = params["id"];
    });

    this.setForm(this.userId);

    
  }

  setForm(userId: string){
    this.authService.getUser(userId).subscribe(data => {
      this.user = data;
      this.editForm = this.fb.group({
        name: [this.user.name, [Validators.required]],
        mobile: [this.user.mobile, [Validators.required, Validators.minLength(6)]]
      });
    });
  }

  editUser(){
    const {
      name,
      mobile
    } = this.editForm.value;
    
    const updateDate = new Date();

    this.authService.editUser({
      uid: this.userId,
      name,
      mobile,
      updateDate
    })
  }
}
