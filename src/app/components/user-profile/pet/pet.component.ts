import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Pet } from '../../../models/pet';
import { PetService } from '../../../services/pet.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent implements OnInit {
  constructor(authService: AuthService, private petService: PetService) {

  }

  pets: Pet[] = [];

  ngOnInit(): void {
    this.petService.getPets().subscribe(response => {
      this.pets = response;
    });    
  }
}
