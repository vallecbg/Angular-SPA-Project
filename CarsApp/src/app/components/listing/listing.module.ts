import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CreateListingComponent } from './create-listing/create-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { ListingAllComponent } from './listing-all/listing-all.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BootstrapModule } from 'src/app/bootstrap.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        CreateListingComponent,
        EditListingComponent,
        ListingAllComponent,
        ListingDetailsComponent
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
        CreateListingComponent,
        EditListingComponent,
        ListingAllComponent,
        ListingDetailsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class ListingModule {}