import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { LoginComponent } from "./components/login/login.component";
import { ReactiveFormsModule } from '@angular/forms';
import { UserHeaderComponent } from "./components/user-header/user-header.component";
import { AuthService } from './services/auth.service';
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [ReactiveFormsModule, LoginComponent, UserHeaderComponent, UserProfileComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  http = inject(HttpClient);

  constructor(public authService: AuthService) {

  }
}
