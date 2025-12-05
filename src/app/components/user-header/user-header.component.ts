import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-header',
    imports: [CommonModule],
    templateUrl: './user-header.component.html',
    styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  constructor(public authService: AuthService) {

  }

  logOut() {
    this.authService.logout();
  }
}
