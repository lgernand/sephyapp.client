import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ProfileListComponent } from "../profile-list/profile-list.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, ProfileListComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  isRegistering = false;
  buttonText = '';

  constructor(private authService: AuthService) { 
    this.setIsLoggingIn();
  }

  credentials: LoginRequest = {
    email: '',
    password: '',
    accountType: ''
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

 setIsLoggingIn(): void {
  this.isRegistering = false;
  this.buttonText = 'Sign in'
 } 

  setIsRegistering(): void {
    this.isRegistering = true;
    this.buttonText = 'Sign up'
  }

  handleFormSubmit() {
    if (this.isRegistering) {
      this.register();
    } else {
      this.login()
    }
  }

  login() {
    return this.authService.login(this.credentials)
    .subscribe(() => {
      console.log('login successful');
    });
  }

  register() {
    return this.authService.register(this.credentials)
    .subscribe(() => {
      console.log('registration successful');
      this.login();
    });
  }
}
