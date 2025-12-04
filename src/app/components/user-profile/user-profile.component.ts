import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetComponent } from "./pet/pet.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, PetComponent],
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
      if (response.id !== '') {
        this.profile = response;
      }
    });
  }

  handleFormSubmit() {
    this.profileService.createProfile(this.profile).subscribe(response => {
      this.profile = response;
    });
  }
}
