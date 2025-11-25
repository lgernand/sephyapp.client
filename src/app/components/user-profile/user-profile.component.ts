import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  constructor(private profileService: ProfileService, public authService: AuthService) {

  }

  profile: Profile = {
    id: '',
    name: '',
    bio: '',
    zipCode: ''
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe(response => {
      this.profile = response;
    });
  }
}
