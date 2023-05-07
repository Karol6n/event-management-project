import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentDate: string;
  currentTime: string;
  user$ = this.usersService.currentUserProfile$;
  constructor(private usersService: UsersService) {
    const now = new Date();
    this.currentDate = now.toLocaleDateString();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }


}
