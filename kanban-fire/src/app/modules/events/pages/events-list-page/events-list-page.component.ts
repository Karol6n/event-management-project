import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { DataService} from 'src/app/services/data-service/data.service';
import { EventsFormBuilder } from '../../config/events-form.builder';
import { RawEvent } from 'src/app/models/events.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { User } from 'src/app/models/role-user.interface';
import { map } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './events-list-page.component.html',
  styleUrls: ['./events-list-page.component.scss'],
})

export class EventsListComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  auth = getAuth();
  eventsList: RawEvent[] = [];
  events = EventsFormBuilder.eventForm();
  user = this.auth.currentUser;
  userId = this.auth.currentUser?.uid;
  selectedEvent = null;
  searchLocation: string;
  markerPositions: google.maps.LatLng[] = [];
  zoom = 12;
  center = {
    lat: 49.816761,
    lng: 19.044138,
  };
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    fullscreenControl: true,
    zoomControl: true,
  }

  constructor(private authService: AuthService, private dataService: DataService, private firestore: AngularFirestore, private toast: HotToastService,  private router: Router) {}


  ngOnInit() {
    this.getAllEvents();
   }

   searchLocationOnMap() {
    if (this.searchLocation) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: this.searchLocation }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const latLng = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          this.center = latLng;
          this.markerPositions = [];
        } else {
          alert("Nie znaleziono tej lokalizacji");
        }
      });
    } else {
      alert("Wprowadź nazwę lub adres lokalizacji, którą chcesz znaleźć");
    }
  }

   onMarkerClick(event, index) {
    this.selectedEvent = this.eventsList[index];
    }

    getAllEvents() {
      this.events.value.dateOfEvent = new Date();
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      this.dataService.getAllEvents()
        .pipe(
          map(res => res.filter((e: any) => e.payload.doc.data().dateOfEvent.toDate() >= today))
        )
        .subscribe({
          next: (res) => {
            this.eventsList = res.map((e: any) => {
              const data = e.payload.doc.data();
              data.id = e.payload.doc.id;
              this.getUserData(data.uid).subscribe((user: any) => {
                data.firstName = user.data().firstName;
                data.lastName = user.data().lastName;
                this.markerPositions = this.eventsList.map(event => new google.maps.LatLng(event.latitude, event.longitude));
              });
              return data;
            });
          },
          error: (err) => {
            alert('Wystąpił błąd, odśwież przeglądarkę')
          }
        });
    }


  toggleJoinEvent(event: RawEvent) {
    if (this.isUserJoined(event)) {
      const index = event.guests.indexOf(this.user.uid);
      if (index > -1) {
        event.guests.splice(index, 1);
      }
      event.limit += 1;
      this.updateEventLimit(event);
    } else {
      if (!event.guests) {
        event.guests = [];
      }
      event.guests.push(this.user.uid);
      event.limit -= 1;
      this.updateEventLimit(event);
    }
  }


  updateEventLimit(event: RawEvent) {
    const newLimit = event.limit;
    this.firestore.collection("events").doc(event.id).update({guests: event.guests, limit: newLimit})
      .then(() => {
        if (this.isUserJoined(event)) {
          this.toast.success("Dołączono do wydarzenia");
        } else {
          this.toast.error("Zrezygnowano z wydarzenia");
        }
      })
      .catch((error) => {
        this.toast.error("Nie udało się zmienić stanu udziału w wydarzeniu");
      });
  }


  isUserJoined(event: RawEvent): boolean {
    if (event.guests != null && this.user) {
      return event.guests.includes(this.user.uid);
    }
    return false;
  }

  isEventFull(event: RawEvent): boolean {
    if (event.limit <= 0) {
      return true;
    }
    return false;
  }

  removeEvent(eventsList: RawEvent){
    if(confirm("Czy na pewno chcesz usunąć " + eventsList.name)){
      this.dataService.deleteEvent(eventsList).then(res=>{

        this.toast.success("Twoje wydarzenie zostało usunięte")
      })
    .catch(err=>{
      this.toast.error("Wystąpił błąd")
    })
    this.router.navigate(['/events']);
    };
  }

  getUserData(uid: string) {
    return this.firestore.collection('users').doc<User>(uid).get();
  }

}
