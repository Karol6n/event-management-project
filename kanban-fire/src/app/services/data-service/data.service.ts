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
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { Event } from 'src/app/models/events.interface';
import { AuthService } from '../auth-service/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore, private authService: AuthService, private afs: AngularFirestore) {}

  addEvent(event: Event) {
    event.eid = this.afs.createId();
    return this.afs
    .collection('/events')
    .add(event)
  }

  getAllEvents() {
    return this.afs
    .collection('/events')
    .snapshotChanges();
  }

  getEventDoc(eid: string) {
    return this.afs
    .collection('/events')
    .doc(eid)
    .valueChanges()
  }

  deleteEvent(event: Event) {
    this.afs
    .doc('/events/'+ event.eid)
    .delete();
  }
  updateEvent(event: Event, eid: string) {
   return this.afs
   .doc('/events/'+ event.eid)
   .update({
    name: event.name,
    category: event.category,
    location: event.location,
    description: event.description,
    dateOfEvent: event.dateOfEvent,
    hourOfEvent: event.hourOfEvent,
    numberOfGuests: event.numberOfGuests,
    freeOrPaid: event.freeOrPaid,
    costOfTicket: event.costOfTicket,
    type: event.type,
   })
  }
}
