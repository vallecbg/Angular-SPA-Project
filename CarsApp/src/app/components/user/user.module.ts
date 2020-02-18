import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BootstrapModule } from 'src/app/bootstrap.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
    declarations: [
        UserDetailsComponent,
        UserEditComponent
    ],
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        BootstrapModule,
        FlexLayoutModule,
    ],
    exports: [
        UserDetailsComponent,
        UserEditComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class UserModule {}