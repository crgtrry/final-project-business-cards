import { AlertService } from './services/alert.service';
import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FileSelectDirective } from 'ng2-file-upload';

import { AlertModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './routes/login/login.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { RegisterComponent } from './routes/register/register.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CreateComponent } from './routes/create/create.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { CardComponent } from './components/card/card.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { WebcamModalComponent } from './components/webcam-modal/webcam-modal.component';
import { CameraComponent } from './components/camera/camera.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    NotFoundComponent,
    NavBarComponent,
    CreateComponent,
    ProfileComponent,
    CardComponent,
    CardItemComponent,
    FileSelectDirective,
    WebcamModalComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule,
    WebcamModule,
    HttpClientModule
  ],
  providers: [
    AlertService
  ],
  entryComponents: [
    WebcamModalComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
