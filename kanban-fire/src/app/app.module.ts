import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage'
import { LoginComponent } from './modules/login/pages/login-page.component';
import { RegisterComponent } from './modules/register/pages/register-page.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
import { ProfileComponent } from './modules/profile/pages/profile.component';
import { LandingComponent } from './modules/landing/landing.component';
import { ForgotPasswordComponent } from './modules/forgot-password/pages/forgot-password-page.component';
import { ResetPasswordComponent } from './modules/reset-password/pages/reset-password-page.component';
import { EventsAddComponent } from './modules/events/pages/events-add-page/events-add-page.component';
import { EventsDetailViewComponent } from './modules/events/pages/events-details-view-page/events-details-view-page.component';
import { EventsListComponent } from './modules/events/pages/events-list-page/events-list-page.component';
import { ContactComponent } from './modules/contact/pages/contact-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PlaceAutocompleteComponent } from './modules/events/components/place-autocomplete.component';
import { MapDisplayComponent } from './modules/events/components/map-display.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth-service/auth.service';
import { EmptyPipe } from './features/pipes/empty.pipe';
import { subStatusPipe } from './features/pipes/free-paid.pipe';
import { eventTypePipe } from './features/pipes/type-of-event.pipe';
import { EventsPastListPageComponent } from './modules/events/pages/events-past-list-page/events-past-list-page.component';
import { EventsFutureListPageComponent } from './modules/events/pages/events-future-list-page/events-future-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    LandingComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EventsAddComponent,
    EventsDetailViewComponent,
    EventsPastListPageComponent,
    EventsFutureListPageComponent,
    EventsListComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    PlaceAutocompleteComponent,
    MapDisplayComponent,
    HttpClientModule,
    EmptyPipe,
    subStatusPipe,
    eventTypePipe,
  ],
  providers: [HttpClient, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
