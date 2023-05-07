import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { combineLatest, filter, from, map, Observable, of, switchMap } from 'rxjs';
import { RawEvent } from 'src/app/models/events.interface';
import { AuthService } from '../auth-service/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/role-user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore, private authService: AuthService, private afs: AngularFirestore) {}

  addEvent(event: RawEvent) {
    event.id = this.afs.createId();
    return this.afs
    .collection('/events')
    .add(event)
  }

  getAllEvents() {
    return this.afs
    .collection('/events')
    .snapshotChanges();
  }

  getEventDoc(id: any) {
    return this.afs
    .collection('/events')
    .doc(id)
    .valueChanges()
  }

  deleteEvent(event: RawEvent) {
    return this.afs.doc('/events/'+ event.id).delete();
  }

  getGuestsForEvent(eventId: string): Observable<User[]> {
    const eventDoc = this.afs.collection<RawEvent>('events').doc(eventId);
    return eventDoc.valueChanges().pipe(
      switchMap((event) => {
        const guestDocs = event?.guests?.map((guestUid) => {
          return this.afs.collection<User>('users').doc(guestUid).snapshotChanges();
        });
        return guestDocs ? combineLatest(guestDocs) : of([]);
      }),
      map((guestSnapshots) => {
        return guestSnapshots.map((guestSnapshot) => {
          const guest = guestSnapshot.payload.data() as User;
          guest.uid = guestSnapshot.payload.id;
          return guest;
        });
      })
    );
  }

}
