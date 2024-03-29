import { User } from "./role-user.interface";

export interface RawEvent {
  id: string,
  name?: string,
  category?: string[],
  location?: string,
  description?: string,
  dateOfEvent?: any,
  hourOfEvent?: string,
  photoURL?: string,
  numberOfGuests?: number,
  limit?: number,
  latitude? : number,
  longitude? : number,
  freeOrPaid?: string,
  costOfTicket?: string,
  linkToTicket?: string,
  typeOfEvent?: string,
  dressCode?: string[],
  uid?: string,
  guests: string[];
}
