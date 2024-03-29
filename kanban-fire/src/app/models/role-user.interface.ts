export interface Roles {
  participant?: boolean;
  organizer?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phone?: string;
  address?: string;
  photoURL?: string;
}
