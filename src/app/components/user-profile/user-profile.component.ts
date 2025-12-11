import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { PetComponent } from "./pet/pet.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-user-profile',
    imports: [CommonModule, MatButtonModule,FormsModule, PetComponent, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCard, MatCardHeader, MatCardTitle],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  private formBuilder = inject(FormBuilder)

  constructor(private profileService: ProfileService, public authService: AuthService) {

  }

  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    bio: ['', Validators.required],
    zipCode: ['', Validators.required]
  })

  profile: Profile = {
    id: '',
    name: '',
    bio: '',
    zipCode: '',
    role: ''
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
