import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, concatMap, distinct, distinctUntilChanged, forkJoin, from, map, scan, switchMap, tap } from 'rxjs';
import { RawEvent } from 'src/app/models/events.interface';
import { User } from 'src/app/models/role-user.interface';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-view',
  templateUrl: './events-details-view-page.component.html',
  styleUrls: ['./events-details-view-page.component.scss'],
})

export class EventsDetailViewComponent implements OnInit {
  eventId: string;
  event: RawEvent;
  guests$: Observable<User[]>;
  constructor(private route: ActivatedRoute, private dataService: DataService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.guests$ = this.dataService.getEventDoc(this.eventId).pipe(
      tap((event: RawEvent) => this.event = event),
      switchMap((event: RawEvent) => {
        const guestUids = event.guests || [];
        const guestObservables = guestUids.map((guestUid: string) => {
          return this.getUserData(guestUid).pipe(
            distinctUntilChanged()
          );
        });
        return combineLatest(guestObservables).pipe(
          map((guests: User[]) => {
            return guests.reduce((accumulator, currentValue) => {
              return accumulator.concat(currentValue);
            }, []);
          })
        );
      })
    );
  }


  getUserData(uid: string) {
    return this.firestore.collection('users').doc<User>(uid).valueChanges();
  }

}
