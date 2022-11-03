import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  user$ = this.usersService.currentUserProfile$;
  constructor(private usersService: UsersService) { }


}
