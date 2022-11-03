import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service/auth.service';
import { UsersService } from './services/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$ = this.usersService.currentUserProfile$;
  constructor(public authService: AuthService, private router: Router, public usersService: UsersService) {}
  title = 'Event Management App';

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
