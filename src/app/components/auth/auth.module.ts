import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
    ],
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        FlexLayoutModule
    ],
    exports: [
        SigninComponent,
        SignupComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class AuthModule {}