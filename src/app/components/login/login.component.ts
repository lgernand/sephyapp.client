import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { AddRoleRequest } from '../../models/addRole-request';

@Component({
    selector: 'app-login',
    imports: [FormsModule, NgIf, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  isRegistering = false;
  buttonText = '';
  roles: String[] = []; 

  constructor(private authService: AuthService, private roleService: RoleService) { 
    this.setIsLoggingIn();
    this.getRoles();
  }

  credentials: LoginRequest = {
    email: '',
    password: '',
    accountType: ''
  }

  roleRequest: AddRoleRequest = {
    RoleName: ''
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
      this.authService.login(this.credentials).subscribe(() => {
        this.addRole();
      });
    });
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe(response => {
      this.roles = response;
    })
  }

  addRole(): void {
    this.roleRequest.RoleName = this.credentials.accountType

    this.roleService.addUserToRole(this.roleRequest).subscribe(() => {
      console.log('role added');
    });
  }
}
