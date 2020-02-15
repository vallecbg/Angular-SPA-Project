import { NgModule } from "@angular/core";
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
    ],
    exports: [
        AngularFireModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
    ],
    providers: [AngularFireDatabase],
  })
  export class FirebaseModule {}