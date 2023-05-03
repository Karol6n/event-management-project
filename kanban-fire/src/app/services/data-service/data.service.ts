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
import { RawEvent } from 'src/app/models/events.interface';
import { AuthService } from '../auth-service/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
}
